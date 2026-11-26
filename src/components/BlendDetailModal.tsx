import { useEffect } from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import type { CoffeeBlend, CoffeeBrand } from '../types/coffee';
import { EspressoCupIcon, KamiraCompatibilityStrip, MokaIcon } from './CoffeeIcons';

interface BlendDetailModalProps {
  brand: CoffeeBrand;
  blend: CoffeeBlend;
  onClose: () => void;
  onSelectBlend: (blend: CoffeeBlend) => void;
}

export function BlendDetailModal({
  brand,
  blend,
  onClose,
  onSelectBlend,
}: BlendDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const recommendedMokaAlternative = !blend.kamiraCompatible
    ? brand.blends.find((b) => b.kamiraCompatible)
    : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] bg-[#1C100A]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blend-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FCF9F4] border border-[#DFD2BF] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#744932]">
                {brand.name} · {blend.subtitle} · Tostatura {blend.roastLevel}
              </p>
              <h3
                id="blend-modal-title"
                className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1B12] mt-1"
              >
                {blend.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi scheda miscela"
              className="p-2 rounded-md text-[#593724] hover:text-[#1C100A] hover:bg-[#EDE3D5] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Verdetto compatibilità Kamira con immagine */}
          <KamiraCompatibilityStrip compatible={blend.kamiraCompatible} />

          {/* Descrizione */}
          <p className="text-[15px] leading-relaxed text-[#3E261A]">{blend.description}</p>

          {/* Scheda tecnica granulometria e simbolo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E4D7C5]">
            <div className="bg-white border border-[#E4D7C5] rounded-lg p-4">
              <p className="text-xs text-[#744932]">Simbolo sulla confezione</p>
              <div className="flex items-center gap-3 mt-2">
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                    blend.packSymbol === 'moka'
                      ? 'bg-[#F6F0E7] text-[#2C1B12]'
                      : 'bg-[#FDF1F0] text-[#991B1B]'
                  }`}
                >
                  {blend.packSymbol === 'moka' ? (
                    <MokaIcon className="w-6 h-6" />
                  ) : (
                    <EspressoCupIcon className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2C1B12]">
                    {blend.packSymbol === 'moka' ? 'Simbolo della Moka' : 'Simbolo della Tazzina'}
                  </p>
                  <p className="text-xs text-[#6B4C38]">
                    {blend.packSymbol === 'moka'
                      ? 'Estrazione da fornello'
                      : 'Macchina espresso a pompa'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E4D7C5] rounded-lg p-4">
              <p className="text-xs text-[#744932]">Grammatura della polvere</p>
              <p className="text-sm font-semibold text-[#2C1B12] mt-2">{blend.grindLabel}</p>
              <p className="font-mono text-xs text-[#6B4C38] tabular-nums mt-1">
                Granulometria media: {blend.micronRange}
              </p>
            </div>
          </div>

          {/* Provenienza del chicco e composizione */}
          <div className="space-y-4 pt-4 border-t border-[#E4D7C5]">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#744932]">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Provenienza dei chicchi</span>
              </div>
              <p className="text-sm font-semibold text-[#2C1B12] mt-1">
                {blend.origins.join(' · ')}
              </p>
              <p className="text-xs text-[#593724] mt-0.5">{blend.originRegionSummary}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-[#744932]">Composizione</p>
                <p className="font-medium text-[#2C1B12] mt-0.5">{blend.composition}</p>
              </div>
              <div>
                <p className="text-xs text-[#744932]">Intensità aromatica</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-[#E4D7C5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4A2E1F] rounded-full"
                      style={{ width: `${blend.intensity * 10}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-medium text-[#2C1B12] tabular-nums">
                    {blend.intensity}/10
                  </span>
                </div>
              </div>
            </div>

            {blend.aromaticNotes.length > 0 && (
              <div>
                <p className="text-xs text-[#744932]">Note aromatiche</p>
                <p className="text-sm text-[#2C1B12] mt-0.5">
                  {blend.aromaticNotes.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {/* Consiglio tecnico Kamira */}
          <div className="bg-[#F6F0E7] border border-[#DFD2BF] rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-[#2C1B12]">
              Consiglio per l’estrazione con Kamira
            </p>
            <p className="text-sm leading-relaxed text-[#3E261A]">{blend.kamiraNote}</p>

            {recommendedMokaAlternative && (
              <div className="pt-2 border-t border-[#DFD2BF] flex items-center justify-between gap-3">
                <p className="text-xs text-[#593724]">
                  Alternativa {brand.name} ideale per Kamira:{' '}
                  <strong className="text-[#2C1B12]">{recommendedMokaAlternative.name}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => onSelectBlend(recommendedMokaAlternative)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#14532D] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Vedi miscela</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
