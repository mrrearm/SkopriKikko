import { COFFEE_IMAGES } from '../data/coffeeDatabase';
import { EspressoCupIcon, KamiraCompatibilityStrip, MokaIcon } from './CoffeeIcons';

export function GrindGuideSection() {
  return (
    <section
      id="macinatura"
      className="py-16 sm:py-24 bg-[#FCF9F4] border-y border-[#DFD2BF]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Intestazione sezione */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-wide text-[#744932]">
            01. Guida alla grammatura
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C1B12] leading-tight">
            Perché la Kamira richiede polvere da Moka e non da Espresso
          </h2>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#4A2E1F]">
            La Kamira funziona con un principio termodinamico naturale affine alla moka, senza pompe elettriche da 9–15 bar. Osservare il simbolo stampato sul pacco è il modo più rapido per capire se la grammatura della polvere è adatta.
          </p>
        </div>

        {/* Confronto fotografico macro macinatura */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col bg-white border border-[#DFD2BF] rounded-xl overflow-hidden">
            <div className="relative aspect-[16/10] w-full bg-[#EDE3D5] overflow-hidden">
              <img
                src={COFFEE_IMAGES.grindComparison}
                alt="Confronto fotografico ravvicinato tra macinatura medio-grossa per Moka a sinistra e polvere fine per Espresso a destra con chicchi di caffè"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#DFD2BF] bg-white">
              <div className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-[#14532D]">Sinistra · Medio-Grossa</p>
                <p className="text-sm font-medium text-[#2C1B12] mt-0.5">
                  Granuli visibili (550–700 µm)
                </p>
                <p className="text-xs text-[#6B4C38] mt-1">
                  L’acqua calda attraversa il pannello in modo fluido estraendo una crema densa.
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-[#991B1B]">Destra · Polvere Fine</p>
                <p className="text-sm font-medium text-[#2C1B12] mt-0.5">
                  Consistenza impalpabile (220–340 µm)
                </p>
                <p className="text-xs text-[#6B4C38] mt-1">
                  Si compatta eccessivamente nel filtro ostacolando il passaggio dell’acqua.
                </p>
              </div>
            </div>
          </div>

          {/* Due schede di confronto diretto Moka vs Espresso */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Scheda Moka - Adatta */}
            <div className="flex-1 bg-white border border-[#DFD2BF] rounded-xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#F6F0E7] text-[#2C1B12] flex items-center justify-center shrink-0">
                    <MokaIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#2C1B12]">
                      Simbolo della Moka
                    </h3>
                    <p className="text-xs text-[#6B4C38]">
                      Grammatura spessa / medio-grossa
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#3E261A]">
                  Cerca l’icona della moka sulla confezione. Questa macinatura consente alla Kamira di estrarre gli oli aromatici in 30–90 secondi senza sovrappressioni.
                </p>
              </div>
              <KamiraCompatibilityStrip compatible={true} />
            </div>

            {/* Scheda Espresso - Non adatta */}
            <div className="flex-1 bg-white border border-[#DFD2BF] rounded-xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#FDF1F0] text-[#991B1B] flex items-center justify-center shrink-0">
                    <EspressoCupIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#2C1B12]">
                      Simbolo della Tazzina
                    </h3>
                    <p className="text-xs text-[#6B4C38]">
                      Grammatura molto fine (Espresso casa/bar)
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#3E261A]">
                  Le confezioni con la tazzina espresso contengono polvere sottile pensata per pompe elettriche ad alta pressione: nella Kamira frena l’estrazione.
                </p>
              </div>
              <KamiraCompatibilityStrip compatible={false} />
            </div>
          </div>
        </div>

        {/* Fascia fotografica sui chicchi e provenienze */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          <div className="md:col-span-5 rounded-xl overflow-hidden border border-[#DFD2BF] bg-[#EDE3D5] aspect-[4/3]">
            <img
              src={COFFEE_IMAGES.beanOrigins}
              alt="Tre ciotole in ceramica beige con chicchi di caffè tostati di diverse origini e gradi di tostatura"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1B12]">
              Provenienza del chicco e resa della crema
            </h3>
            <p className="text-[15px] leading-relaxed text-[#3E261A]">
              Oltre alla grammatura Moka, l’origine botanica e geografica del chicco determina carattere e cremosità dell’espresso ottenuto con Kamira.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-[#DFD2BF]">
              <div>
                <p className="text-sm font-semibold text-[#2C1B12]">Brasile &amp; Centro America</p>
                <p className="text-xs leading-relaxed text-[#593724] mt-1">
                  Arabica dolci con note di nocciola, miele e cioccolato al latte, bassa acidità.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C1B12]">Etiopia &amp; Kenya</p>
                <p className="text-xs leading-relaxed text-[#593724] mt-1">
                  Profili floreali, agrumati e profumati di alta quota, ideali per tostature medie.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C1B12]">India, Vietnam &amp; Uganda</p>
                <p className="text-xs leading-relaxed text-[#593724] mt-1">
                  Robusta corpose e speziate che conferiscono alla Kamira una crema fitta e persistente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
