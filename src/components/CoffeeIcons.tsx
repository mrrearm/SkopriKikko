import { CheckCircle2, XCircle } from 'lucide-react';
import { KAMIRA_OFFICIAL_IMAGE } from '../data/coffeeDatabase';

interface IconProps {
  className?: string;
}

/**
 * Simbolo iconico della Moka italiana presente sulle confezioni di caffè
 * a macinatura medio-grossa.
 */
export function MokaIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pomolo coperchio */}
      <rect x="13.5" y="2.5" width="5" height="2.4" rx="1" fill="currentColor" />
      {/* Coperchio */}
      <path
        d="M9.5 7.5L16 5L22.5 7.5H9.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Beccuccio */}
      <path
        d="M10 8.5L6.5 9.2L9.5 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Corpo superiore ottagonale */}
      <path
        d="M10 7.5H22L20.3 17H11.7L10 7.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Linea centrale */}
      <line x1="16" y1="7.5" x2="16" y2="17" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      {/* Manico */}
      <path
        d="M21.8 9H25.2C26.2 9 27 9.8 27 10.8V14.2C27 15.2 26.2 16 25.2 16H20.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Caldaia inferiore */}
      <path
        d="M11.7 17H20.3L22.6 28.5H9.4L11.7 17Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Valvola di sicurezza */}
      <circle cx="19" cy="21.5" r="1.1" fill="currentColor" />
      {/* Base */}
      <line x1="8" y1="28.5" x2="24" y2="28.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Simbolo della Tazzina Espresso presente sulle confezioni di caffè
 * a macinatura fine per macchine espresso.
 */
export function EspressoCupIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Vapore */}
      <path
        d="M12.5 7.5C12.5 5.8 14 5.5 14 3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M17.5 7.5C17.5 5.8 19 5.5 19 3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Corpo tazzina */}
      <path
        d="M7.5 11.5H21.5V17.5C21.5 21.4 18.4 24.5 14.5 24.5C10.6 24.5 7.5 21.4 7.5 17.5V11.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Manico tazzina */}
      <path
        d="M21.5 13.5H24C25.5 13.5 26.5 14.6 26.5 16C26.5 17.4 25.5 18.5 24 18.5H21.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Piattino */}
      <path
        d="M5.5 27H23.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9 28.8H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * Indicatore di compatibilità Kamira con segno di spunta verde o simbolo rosso
 * affiancato all'immagine della macchina Kamira caricata dall'utente.
 */
interface KamiraCompatibilityStripProps {
  compatible: boolean;
  compact?: boolean;
}

export function KamiraCompatibilityStrip({
  compatible,
  compact = false,
}: KamiraCompatibilityStripProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 ${
        compact ? 'py-2' : 'py-2.5'
      } ${
        compatible
          ? 'bg-[#EEF6F0] border-[#B9DBC3] text-[#14532D]'
          : 'bg-[#FDF1F0] border-[#F0C2BE] text-[#991B1B]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {compatible ? (
          <CheckCircle2
            className="w-5 h-5 shrink-0 text-[#15803D]"
            aria-hidden="true"
          />
        ) : (
          <XCircle
            className="w-5 h-5 shrink-0 text-[#DC2626]"
            aria-hidden="true"
          />
        )}
        <div className="min-w-0">
          <p
            className={`font-semibold leading-tight ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            {compatible ? 'Ideale per la Kamira' : 'Non adatto alla Kamira'}
          </p>
          {!compact && (
            <p className="text-[11px] opacity-85 leading-snug mt-0.5">
              {compatible
                ? 'Polvere Moka spessa · estrazione fluida'
                : 'Polvere Espresso troppo fine · rischio blocco'}
            </p>
          )}
        </div>
      </div>

      {/* Immagine ufficiale Kamira caricata dall'utente accanto al simbolo */}
      <div
        className={`relative shrink-0 rounded-md bg-white border flex items-center justify-center overflow-hidden ${
          compact ? 'w-9 h-9 p-0.5' : 'w-11 h-11 p-1'
        } ${compatible ? 'border-[#B9DBC3]' : 'border-[#F0C2BE]'}`}
        title={compatible ? 'Compatibile con Kamira' : 'Non compatibile con Kamira'}
      >
        <img
          src={KAMIRA_OFFICIAL_IMAGE}
          alt="Macchina espresso Kamira"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain ${
            compatible ? '' : 'opacity-65 grayscale-[35%]'
          }`}
        />
        {!compatible && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="block w-[130%] h-[2px] bg-[#DC2626]/80 -rotate-45" />
          </span>
        )}
      </div>
    </div>
  );
}
