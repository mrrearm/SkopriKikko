import { MapPin, ArrowUpRight, Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import type { CoffeeBlend, CoffeeBrand, CompatibilityFilter } from '../types/coffee';
import { EspressoCupIcon, KamiraCompatibilityStrip, MokaIcon } from './CoffeeIcons';

interface BrandSearchSectionProps {
  brands: CoffeeBrand[];
  selectedBrand: CoffeeBrand;
  onSelectBrand: (brand: CoffeeBrand) => void;
  compatibilityFilter: CompatibilityFilter;
  onFilterChange: (filter: CompatibilityFilter) => void;
  onOpenBlendDetail: (blend: CoffeeBlend) => void;
  isSearchingLive: boolean;
  liveSearchTerm: string;
  searchError: string | null;
  onClearError: () => void;
  onRetryLiveSearch: () => void;
}

export function BrandSearchSection({
  brands,
  selectedBrand,
  onSelectBrand,
  compatibilityFilter,
  onFilterChange,
  onOpenBlendDetail,
  isSearchingLive,
  liveSearchTerm,
  searchError,
  onClearError,
  onRetryLiveSearch,
}: BrandSearchSectionProps) {
  const compatibleCount = selectedBrand.blends.filter((b) => b.kamiraCompatible).length;
  const incompatibleCount = selectedBrand.blends.length - compatibleCount;

  const filteredBlends = selectedBrand.blends.filter((blend) => {
    if (compatibilityFilter === 'compatible') return blend.kamiraCompatible;
    if (compatibilityFilter === 'incompatible') return !blend.kamiraCompatible;
    return true;
  });

  return (
    <section id="ricerca" className="py-14 sm:py-20 bg-[#F6F0E7]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Selettore rapido torrefazioni */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-xs font-semibold tracking-wide text-[#744932]">
              Torrefazioni in archivio
            </p>
            <p className="text-xs text-[#6B4C38] tabular-nums">
              {brands.length} marche pronte · ricerca libera attiva
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Seleziona marca di caffè"
          >
            {brands.map((brand) => {
              const isActive = brand.id === selectedBrand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectBrand(brand)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#593724] ${
                    isActive
                      ? 'bg-[#2C1B12] text-white border-[#2C1B12]'
                      : 'bg-white text-[#3E261A] border-[#DFD2BF] hover:border-[#9C7052] hover:bg-[#FCF9F4]'
                  }`}
                >
                  {brand.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stato di errore ricerca dinamica */}
        {searchError && (
          <div
            role="alert"
            className="bg-[#FDF1F0] border border-[#F0C2BE] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#B42318] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#991B1B]">
                  Ricerca non completata
                </p>
                <p className="text-sm text-[#7F1D1D] mt-0.5">{searchError}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {liveSearchTerm && (
                <button
                  type="button"
                  onClick={onRetryLiveSearch}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#991B1B] bg-white border border-[#F0C2BE] hover:bg-[#FCE8E6] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Riprova</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClearError}
                className="px-3 py-2 text-xs font-medium text-[#7F1D1D] hover:underline cursor-pointer whitespace-nowrap"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}

        {/* Stato di caricamento ricerca dinamica */}
        {isSearchingLive ? (
          <div
            aria-live="polite"
            className="bg-white border border-[#DFD2BF] rounded-xl p-10 sm:p-14 text-center space-y-4"
          >
            <Loader2
              className="w-8 h-8 text-[#593724] animate-spin mx-auto"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-semibold text-[#2C1B12]">
                Ricerca miscele per “{liveSearchTerm}”
              </h2>
              <p className="text-sm text-[#6B4C38]">
                Analisi della gamma macinati, della provenienza dei chicchi e della granulometria per Kamira…
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Intestazione della marca selezionata + filtro compatibilità */}
            <div className="bg-white border border-[#DFD2BF] rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#744932]">
                  <span>
                    {selectedBrand.city}, {selectedBrand.country}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">Dal {selectedBrand.foundedYear}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedBrand.signatureStyle}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C1B12]">
                  {selectedBrand.name}
                </h2>

                <p className="text-[15px] leading-relaxed text-[#4A2E1F]">
                  {selectedBrand.summary}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-medium tabular-nums">
                  <span className="text-[#2C1B12]">
                    {selectedBrand.blends.length} miscele analizzate
                  </span>
                  <span className="text-[#9C7052]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#14532D]">
                    {compatibleCount}{' '}
                    {compatibleCount === 1 ? 'ideale per Kamira' : 'ideali per Kamira'}
                  </span>
                  <span className="text-[#9C7052]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#991B1B]">
                    {incompatibleCount}{' '}
                    {incompatibleCount === 1 ? 'non adatta' : 'non adatte'}
                  </span>
                </div>
              </div>

              {/* Controllo segmentato funzionale di filtro */}
              <div
                className="inline-flex items-center p-1 bg-[#F6F0E7] border border-[#DFD2BF] rounded-lg self-start lg:self-end shrink-0"
                role="group"
                aria-label="Filtra miscele per compatibilità Kamira"
              >
                <button
                  type="button"
                  onClick={() => onFilterChange('all')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    compatibilityFilter === 'all'
                      ? 'bg-[#2C1B12] text-white'
                      : 'text-[#593724] hover:text-[#1C100A]'
                  }`}
                >
                  Tutte ({selectedBrand.blends.length})
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange('compatible')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    compatibilityFilter === 'compatible'
                      ? 'bg-[#15693B] text-white'
                      : 'text-[#593724] hover:text-[#1C100A]'
                  }`}
                >
                  Ideali Kamira ({compatibleCount})
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange('incompatible')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    compatibilityFilter === 'incompatible'
                      ? 'bg-[#B42318] text-white'
                      : 'text-[#593724] hover:text-[#1C100A]'
                  }`}
                >
                  Non adatte ({incompatibleCount})
                </button>
              </div>
            </div>

            {/* Griglia miscele */}
            {filteredBlends.length === 0 ? (
              <div className="bg-white border border-[#DFD2BF] rounded-xl p-10 text-center space-y-3">
                <p className="font-serif text-xl font-semibold text-[#2C1B12]">
                  Nessuna miscela in questa categoria per {selectedBrand.name}
                </p>
                <p className="text-sm text-[#593724]">
                  {compatibilityFilter === 'incompatible'
                    ? 'Tutte le miscele catalogate per questa marca hanno macinatura Moka compatibile con Kamira.'
                    : 'Prova a visualizzare tutte le miscele disponibili per questa marca.'}
                </p>
                <button
                  type="button"
                  onClick={() => onFilterChange('all')}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2C1B12] hover:bg-[#4A2E1F] rounded-md transition-colors cursor-pointer"
                >
                  Mostra tutte le miscele
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlends.map((blend) => (
                  <article
                    key={blend.id}
                    className="group bg-white border border-[#DFD2BF] rounded-xl p-6 flex flex-col justify-between gap-5 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#B69B7E]"
                  >
                    <div className="space-y-4">
                      {/* Intestazione miscela */}
                      <div>
                        <p className="text-xs font-medium text-[#744932]">
                          {blend.subtitle} · Tostatura {blend.roastLevel}
                        </p>
                        <h3 className="font-serif text-2xl font-semibold text-[#2C1B12] mt-1 leading-snug">
                          {blend.name}
                        </h3>
                      </div>

                      {/* Compatibilità Kamira con spunta verde o simbolo rosso + foto Kamira */}
                      <KamiraCompatibilityStrip compatible={blend.kamiraCompatible} />

                      {/* Grammatura e Simbolo sulla confezione */}
                      <div className="pt-3 border-t border-[#EFE7DB] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                              blend.packSymbol === 'moka'
                                ? 'bg-[#F6F0E7] text-[#2C1B12]'
                                : 'bg-[#FDF1F0] text-[#991B1B]'
                            }`}
                          >
                            {blend.packSymbol === 'moka' ? (
                              <MokaIcon className="w-5 h-5" />
                            ) : (
                              <EspressoCupIcon className="w-5 h-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#2C1B12] truncate">
                              {blend.grindLabel}
                            </p>
                            <p className="text-[11px] text-[#6B4C38]">
                              {blend.packSymbol === 'moka'
                                ? 'Simbolo della Moka'
                                : 'Simbolo della Tazzina'}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#593724] tabular-nums shrink-0">
                          {blend.micronRange}
                        </span>
                      </div>

                      {/* Provenienza del chicco e composizione */}
                      <div className="pt-3 border-t border-[#EFE7DB] space-y-2.5">
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#744932]">
                            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>Provenienza del chicco</span>
                          </div>
                          <p className="text-sm font-medium text-[#2C1B12] mt-0.5 leading-snug">
                            {blend.origins.join(', ')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-xs text-[#593724]">
                          <span className="truncate">{blend.composition}</span>
                          <span className="font-mono font-medium text-[#2C1B12] tabular-nums shrink-0">
                            Intensità {blend.intensity}/10
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-[#4A2E1F]">
                          {blend.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer card */}
                    <div className="pt-3 border-t border-[#EFE7DB] flex items-center justify-between gap-3">
                      <span className="text-xs text-[#744932] truncate">
                        {blend.aromaticNotes.slice(0, 2).join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenBlendDetail(blend)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C1B12] hover:text-[#744932] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#593724] rounded-sm"
                      >
                        <span>Dettagli</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
