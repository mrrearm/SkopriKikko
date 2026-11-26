import { useMemo, useRef, useState } from 'react';
import { Search, Loader2, ExternalLink } from 'lucide-react';
import {
  COFFEE_IMAGES,
  CURATED_BRANDS,
  KAMIRA_OFFICIAL_URL,
  SKOPRIKIKKO_LOGO,
} from './data/coffeeDatabase';
import type { CoffeeBlend, CoffeeBrand, CompatibilityFilter } from './types/coffee';
import { Header } from './components/Header';
import { BrandSearchSection } from './components/BrandSearchSection';
import { GrindGuideSection } from './components/GrindGuideSection';
import { KamiraInfoSection } from './components/KamiraInfoSection';
import { BlendDetailModal } from './components/BlendDetailModal';
import { KamiraCompatibilityStrip } from './components/CoffeeIcons';

export default function App() {
  const [brands, setBrands] = useState<CoffeeBrand[]>(CURATED_BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string>(CURATED_BRANDS[0].id);
  const [searchInput, setSearchInput] = useState<string>('');
  const [compatibilityFilter, setCompatibilityFilter] =
    useState<CompatibilityFilter>('all');
  const [activeBlend, setActiveBlend] = useState<CoffeeBlend | null>(null);

  const [isSearchingLive, setIsSearchingLive] = useState<boolean>(false);
  const [liveSearchTerm, setLiveSearchTerm] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedBrand = useMemo(
    () => brands.find((b) => b.id === selectedBrandId) ?? brands[0],
    [brands, selectedBrandId]
  );

  const normalizeSearchText = (value: string): string =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’'`]/g, '')
      .toLowerCase()
      .trim();

  // Suggerimenti istantanei mentre l'utente digita (ignora accenti, apostrofi e riconosce alias es. "bistrot" -> "Bristot")
  const matchingSuggestions = useMemo(() => {
    const q = normalizeSearchText(searchInput);
    if (!q) return [];
    return brands.filter(
      (brand) =>
        normalizeSearchText(brand.name).includes(q) ||
        (brand.aliases ?? []).some((alias) => normalizeSearchText(alias).includes(q)) ||
        normalizeSearchText(brand.city).includes(q) ||
        normalizeSearchText(brand.country).includes(q) ||
        brand.blends.some(
          (blend) =>
            normalizeSearchText(blend.name).includes(q) ||
            blend.origins.some((origin) => normalizeSearchText(origin).includes(q))
        )
    );
  }, [brands, searchInput]);

  const scrollToResults = () => {
    const el = document.getElementById('ricerca');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFocusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 220);
  };

  const runLiveBrandSearch = async (term: string) => {
    const cleaned = term.trim();
    if (cleaned.length < 2) {
      setSearchError('Inserisci almeno 2 caratteri per cercare una marca di caffè.');
      return;
    }

    setSearchError(null);
    setLiveSearchTerm(cleaned);
    setIsSearchingLive(true);
    scrollToResults();

    try {
      const apiBase = (
        (import.meta.env.VITE_API_BASE_URL as string | undefined) || ''
      ).replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/brands/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleaned }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setSearchError(
          `Nell'archivio integrato sono subito disponibili ${brands.length} torrefazioni italiane e internazionali. Per cercare altre marche online collega l'URL del server in VITE_API_BASE_URL.`
        );
        return;
      }

      const payload = (await res.json()) as { brand?: CoffeeBrand; error?: string };

      if (!res.ok || !payload.brand) {
        setSearchError(
          payload.error ||
            `Impossibile trovare informazioni per "${cleaned}". Verifica il nome della marca.`
        );
        return;
      }

      const foundBrand = payload.brand;
      setBrands((prev) => {
        const exists = prev.find(
          (b) => b.id === foundBrand.id || b.name.toLowerCase() === foundBrand.name.toLowerCase()
        );
        if (exists) {
          return prev.map((b) => (b.id === exists.id ? foundBrand : b));
        }
        return [foundBrand, ...prev];
      });
      setSelectedBrandId(foundBrand.id);
      setCompatibilityFilter('all');
    } catch {
      setSearchError(
        'Errore di connessione durante la ricerca della marca. Riprova tra qualche istante.'
      );
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (!q) {
      scrollToResults();
      return;
    }

    // Controlla corrispondenza per nome marca, alias, miscela, città o origine nell'archivio locale
    const normalized = normalizeSearchText(q);
    const exactMatch =
      brands.find((b) => {
        const nameNorm = normalizeSearchText(b.name);
        const aliasMatch = (b.aliases ?? []).some((alias) => {
          const aliasNorm = normalizeSearchText(alias);
          return aliasNorm === normalized || aliasNorm.includes(normalized) || normalized.includes(aliasNorm);
        });
        return (
          nameNorm === normalized ||
          nameNorm.includes(normalized) ||
          normalized.includes(nameNorm) ||
          aliasMatch
        );
      }) ?? matchingSuggestions[0];

    if (exactMatch) {
      setSelectedBrandId(exactMatch.id);
      setCompatibilityFilter('all');
      setSearchError(null);
      scrollToResults();
      return;
    }

    // Altrimenti esegue la ricerca dinamica sul server
    await runLiveBrandSearch(q);
  };

  const handleSelectBrand = (brand: CoffeeBrand) => {
    setSelectedBrandId(brand.id);
    setCompatibilityFilter('all');
    setSearchError(null);
  };

  return (
    <div id="inizio" className="min-h-screen flex flex-col bg-[#F6F0E7] text-[#23150E]">
      <Header onFocusSearch={handleFocusSearch} />

      <main className="flex-1">
        {/* Hero Editoriale con Ricerca Marca immediata e fotografia tazzina + chicchi */}
        <section className="bg-[#FCF9F4] border-b border-[#DFD2BF]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Colonna sinistra: Titolo + Form di Ricerca Marca */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-semibold tracking-wide text-[#744932]">
                    Archivio miscele · Provenienza chicchi · Compatibilità Kamira
                  </p>
                  <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2C1B12] leading-[1.12] tracking-tight">
                    Trova la miscela giusta per la tua Kamira
                  </h1>
                  <p className="text-base sm:text-[17px] leading-relaxed text-[#4A2E1F] max-w-xl">
                    Cerca qualsiasi marca di caffè per scoprire tutte le miscele, l’origine dei chicchi e la grammatura della polvere: solo il macinato medio-grosso con simbolo Moka è ideale per la Kamira.
                  </p>
                </div>

                {/* Modulo di ricerca marca */}
                <form onSubmit={handleSearchSubmit} className="space-y-3 max-w-xl">
                  <label htmlFor="brand-search-input" className="sr-only">
                    Cerca la marca di un caffè
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Search
                        className="w-4 h-4 text-[#744932] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        ref={searchInputRef}
                        id="brand-search-input"
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Es. Lavazza, illy, Kimbo, Borbone, Barbera, Quarta, Hag, Starbucks…"
                        className="w-full h-12 pl-10 pr-4 bg-white border border-[#D4C3AE] rounded-lg text-sm text-[#2C1B12] placeholder:text-[#8C705C] focus:outline-none focus:border-[#4A2E1F] focus:ring-2 focus:ring-[#4A2E1F]/15 transition-shadow"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSearchingLive}
                      className="h-12 px-6 text-sm font-semibold text-white bg-[#2C1B12] hover:bg-[#4A2E1F] disabled:opacity-60 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSearchingLive ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Ricerca…</span>
                        </>
                      ) : (
                        <span>Cerca Marca</span>
                      )}
                    </button>
                  </div>

                  {/* Suggerimenti rapidi o ricerca online per marca non presente */}
                  {searchInput.trim().length > 0 && (
                    <div className="bg-white border border-[#DFD2BF] rounded-lg p-3 space-y-2">
                      {matchingSuggestions.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-[#6B4C38]">In archivio:</span>
                          {matchingSuggestions.slice(0, 6).map((brand) => (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => {
                                handleSelectBrand(brand);
                                setSearchInput(brand.name);
                                scrollToResults();
                              }}
                              className="px-2.5 py-1 text-xs font-medium text-[#2C1B12] bg-[#F6F0E7] hover:bg-[#EDE3D5] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                            >
                              {brand.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="text-[#593724]">
                            Marca non ancora in archivio locale: cercala ora nel database completo.
                          </span>
                          <button
                            type="button"
                            onClick={() => runLiveBrandSearch(searchInput)}
                            className="font-semibold text-[#2C1B12] underline underline-offset-2 hover:text-[#744932] whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Cerca “{searchInput.trim()}”
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </form>

                {/* Legenda immediata dei due simboli con immagine Kamira */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl">
                  <KamiraCompatibilityStrip compatible={true} compact={true} />
                  <KamiraCompatibilityStrip compatible={false} compact={true} />
                </div>
              </div>

              {/* Colonna destra: Fotografia editoriale tazzina e chicchi di caffè */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex-1 bg-white border border-[#DFD2BF] rounded-xl overflow-hidden flex flex-col">
                  <div className="flex-1 min-h-[280px] bg-[#EDE3D5] overflow-hidden">
                    <img
                      src={COFFEE_IMAGES.heroCupBeans}
                      alt="Tazzina bianca di espresso con crema dorata, chicchi di caffè tostati e caffettiera Kamira in acciaio inox sullo sfondo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-5 py-4 bg-white border-t border-[#EDE3D5] flex items-center justify-between gap-4 text-xs text-[#593724]">
                    <span>Estrazione cremosa da polvere Moka</span>
                    <span className="font-mono text-[#744932] tabular-nums">550–700 µm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione principale di consultazione marche e miscele */}
        <BrandSearchSection
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={handleSelectBrand}
          compatibilityFilter={compatibilityFilter}
          onFilterChange={setCompatibilityFilter}
          onOpenBlendDetail={(blend) => setActiveBlend(blend)}
          isSearchingLive={isSearchingLive}
          liveSearchTerm={liveSearchTerm}
          searchError={searchError}
          onClearError={() => setSearchError(null)}
          onRetryLiveSearch={() => runLiveBrandSearch(liveSearchTerm)}
        />

        {/* Sezione guida macinatura (Moka vs Espresso) e provenienze dei chicchi */}
        <GrindGuideSection />

        {/* Sezione dedicata alla macchina Kamira (informazioni ufficiali da espressokamira.com) */}
        <KamiraInfoSection />
      </main>

      {/* Footer sobrio con protezione safe-area inferiore per barra gesti Android */}
      <footer className="bg-[#2C1B12] text-[#DFD2BF] border-t border-[#3E261A] safe-area-bottom">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <img
              src={SKOPRIKIKKO_LOGO}
              alt="Logo SkopriKikko"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover ring-1 ring-[#9C7052] shrink-0"
            />
            <div className="space-y-0.5">
              <p className="font-serif text-xl font-semibold text-[#FCF9F4]">SkopriKikko</p>
              <p className="text-xs text-[#C7B39C]">
                Guida alle miscele di caffè, macinatura e compatibilità con la caffettiera espresso Kamira.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#ricerca" className="hover:text-white transition-colors whitespace-nowrap">
              Cerca Marca
            </a>
            <a href="#macinatura" className="hover:text-white transition-colors whitespace-nowrap">
              Guida Macinatura
            </a>
            <a href="#kamira" className="hover:text-white transition-colors whitespace-nowrap">
              La Kamira
            </a>
            <a
              href={KAMIRA_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#FCF9F4] hover:underline whitespace-nowrap"
            >
              <span>espressokamira.com</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      {/* Scheda modale di approfondimento singola miscela */}
      {activeBlend && (
        <BlendDetailModal
          brand={selectedBrand}
          blend={activeBlend}
          onClose={() => setActiveBlend(null)}
          onSelectBlend={(nextBlend) => setActiveBlend(nextBlend)}
        />
      )}
    </div>
  );
}
