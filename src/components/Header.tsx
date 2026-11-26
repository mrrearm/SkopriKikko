import { SKOPRIKIKKO_LOGO } from '../data/coffeeDatabase';

interface HeaderProps {
  onFocusSearch: () => void;
}

export function Header({ onFocusSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F4]/95 backdrop-blur-sm border-b border-[#DFD2BF] safe-area-top">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Single-line Brand Logo & Wordmark */}
        <a
          href="#inizio"
          className="inline-flex items-center gap-2.5 font-serif text-2xl font-semibold tracking-tight text-[#2C1B12] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#593724] rounded-sm"
        >
          <img
            src={SKOPRIKIKKO_LOGO}
            alt="Logo SkopriKikko"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#C7A97B] shrink-0"
          />
          <span>SkopriKikko</span>
        </a>

        {/* Zone 2: Clean single-line text nav links */}
        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#593724]"
        >
          <a
            href="#ricerca"
            className="hover:text-[#1C100A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Ricerca
          </a>
          <a
            href="#macinatura"
            className="hover:text-[#1C100A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Macinatura
          </a>
          <a
            href="#kamira"
            className="hover:text-[#1C100A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            La Kamira
          </a>
          <a
            href="#preparazione"
            className="hover:text-[#1C100A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Preparazione
          </a>
        </nav>

        {/* Zone 3: Single primary CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-[#2C1B12] hover:bg-[#4A2E1F] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#593724]"
          >
            Cerca Marca
          </button>
        </div>
      </div>
    </header>
  );
}
