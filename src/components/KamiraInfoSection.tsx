import { ExternalLink } from 'lucide-react';
import {
  COFFEE_IMAGES,
  KAMIRA_OFFICIAL_IMAGE,
  KAMIRA_OFFICIAL_INFO,
  KAMIRA_OFFICIAL_URL,
} from '../data/coffeeDatabase';

export function KamiraInfoSection() {
  return (
    <section id="kamira" className="py-16 sm:py-24 bg-[#F6F0E7]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Storia & Identità Kamira */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 bg-white border border-[#DFD2BF] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center py-4">
              <img
                src={KAMIRA_OFFICIAL_IMAGE}
                alt="Macchina espresso da fornello Kamira in acciaio inossidabile durante l'erogazione di un espresso cremoso"
                referrerPolicy="no-referrer"
                className="w-full max-w-[340px] max-h-[380px] object-contain"
              />
            </div>
            <div className="pt-4 border-t border-[#EDE3D5] flex items-center justify-between gap-4 text-xs text-[#6B4C38]">
              <span>Kamira · Acciaio Inox Artigianale</span>
              <span className="font-mono tabular-nums">Dal {KAMIRA_OFFICIAL_INFO.birthYear}</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wide text-[#744932]">
                02. Informazioni ufficiali da espressokamira.com
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C1B12] leading-tight">
                Kamira: l’espresso cremoso inventato in Sicilia
              </h2>
              <p className="text-sm font-medium text-[#593724]">
                Ideata da {KAMIRA_OFFICIAL_INFO.inventor} · {KAMIRA_OFFICIAL_INFO.originPlace} · Brevetto{' '}
                {KAMIRA_OFFICIAL_INFO.patentedSystem}
              </p>

              <div className="space-y-3.5 pt-1 text-[15px] leading-relaxed text-[#3E261A]">
                {KAMIRA_OFFICIAL_INFO.storyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Tabella specifiche tecniche ufficiali */}
            <div className="bg-white border border-[#DFD2BF] rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#EDE3D5] flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#2C1B12]">
                  Caratteristiche tecniche ufficiali
                </h3>
                <a
                  href={KAMIRA_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#593724] hover:text-[#1C100A] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>espressokamira.com</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
              <dl className="divide-y divide-[#EFE7DB]">
                {KAMIRA_OFFICIAL_INFO.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-5 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm"
                  >
                    <dt className="sm:col-span-4 text-[#6B4C38] font-medium">{spec.label}</dt>
                    <dd className="sm:col-span-8 text-[#2C1B12] font-medium tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Preparazione in 4 passaggi + fotografia tazzine espresso */}
        <div
          id="preparazione"
          className="pt-12 border-t border-[#DFD2BF] grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-[#744932]">
                03. Rituale di estrazione
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1B12]">
                Come preparare un espresso cremoso con Kamira
              </h3>
            </div>

            <ol className="space-y-5">
              {KAMIRA_OFFICIAL_INFO.steps.map((step) => (
                <li
                  key={step.number}
                  className="bg-white border border-[#DFD2BF] rounded-xl p-5 flex items-start gap-4"
                >
                  <span className="font-mono text-sm font-medium text-[#744932] tabular-nums pt-0.5 shrink-0">
                    {step.number}.
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-[#2C1B12]">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-[#4A2E1F] mt-1">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 flex flex-col bg-white border border-[#DFD2BF] rounded-xl overflow-hidden">
            <div className="flex-1 min-h-[280px] bg-[#EDE3D5] overflow-hidden">
              <img
                src={COFFEE_IMAGES.espressoCups}
                alt="Due tazzine di espresso italiano, in vetro e ceramica bianca, con crema nocciola e chicchi tostati"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3 bg-[#2C1B12] text-[#FCF9F4]">
              <p className="font-serif text-xl font-medium leading-snug">
                Zero capsule, zero guarnizioni, solo vero caffè sfuso.
              </p>
              <p className="text-sm text-[#DFD2BF] leading-relaxed">
                Approfondisci storia, versioni a singolo o doppio braccetto e accessori direttamente sul portale ufficiale del produttore.
              </p>
              <div className="pt-1">
                <a
                  href={KAMIRA_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#FCF9F4] text-[#2C1B12] hover:bg-[#EDE3D5] rounded-md transition-colors whitespace-nowrap"
                >
                  <span>Visita espressokamira.com</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
