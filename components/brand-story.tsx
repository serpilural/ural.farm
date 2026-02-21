"use client"

import Image from "next/image"
import { useLanguage } from "./language-context"

const t = {
  tr: {
    divider: "Kur. 1990 \u2014 Bozova, Urfa",
    headline: "G\u00FCneydo\u011Fu Anadolu\u2019nun topra\u011F\u0131na k\u00F6k salm\u0131\u015F bir aile miras\u0131.",
    p1: "Bah\u00E7emiz, Urfa\u2019n\u0131n Bozova il\u00E7esinde. 35 hektar arazi, yakla\u015F\u0131k 4.900 a\u011Fa\u00E7 ve her Eyl\u00FCl\u2019de yaln\u0131zca yedi g\u00FCnl\u00FCk bir hasat penceresi. Bu k\u0131sa s\u00FCre her \u015Feyi belirliyor. Nesiller boyunca burada f\u0131st\u0131k yeti\u015Ftirdik \u2014 ve bu y\u0131l, ilk kez, do\u011Frudan sizinle bulu\u015Fuyoruz.",
    p2: "Hasat etti\u011Fimiz f\u0131st\u0131klar\u0131 24 saat i\u00E7inde kuruttuktan sonra, bu f\u0131st\u0131\u011F\u0131 d\u00FCnyaya tan\u0131tan \u015Fehir olan Gaziantep\u2019te k\u00FC\u00E7\u00FCk partiler halinde kavuruyoruz. Ara depo yok. Ayl\u0131k bekletme yok. Elinize ge\u00E7en f\u0131st\u0131k, birka\u00E7 hafta \u00F6nce Bozova\u2019da bir a\u011Fa\u00E7tan topland\u0131.",
    stat1Label: "Y\u0131ll\u0131k Deneyim",
    stat2Label: "Nesil",
    stat3Label: "\u00DCr\u00FCn",
  },
  en: {
    divider: "Est. 1990 \u2014 Bozova, Urfa",
    headline: "A family legacy, rooted in the soil of southeastern Türkiye.",
    p1: "Our farm is in Bozova, Urfa. We have 35 hectares, roughly 4,900 trees, and a harvest window of seven days every September. We have been growing pistachios here for generations \u2014 and this year, for the first time, we are selling directly to the people who eat them.",
    p2: "We harvest in September, dry within 24 hours, and send our pistachios to be roasted in small batches in Gaziantep \u2014 the same city that made this nut famous. No warehouses. No months-old inventory. What you receive was growing on a tree in Bozova a few weeks ago.",
    stat1Label: "Years of Experience",
    stat2Label: "Generations",
    stat3Label: "Product",
  },
}

export function BrandStory() {
  const { lang } = useLanguage()
  const s = t[lang]

  return (
    <section id="story" className="bg-accent text-accent-foreground">
      {/* Divider phrase */}
      <div className="px-6 md:px-12 py-16 md:py-24 border-b border-accent-foreground/10">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-accent-foreground/50">
          {s.divider}
        </p>
      </div>

      {/* Story content */}
      <div className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-accent-foreground mb-10 text-pretty">
              {s.headline}
            </h2>
            <div className="flex flex-col gap-6 text-accent-foreground/70 text-base leading-relaxed">
              <p>{s.p1}</p>
              <p>{s.p2}</p>
            </div>
            <div className="mt-12 flex gap-16">
              <div>
                <p className="font-serif text-3xl md:text-4xl text-accent-foreground">
                  35
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-accent-foreground/50 mt-2">
                  {s.stat1Label}
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-accent-foreground">
                  3
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-accent-foreground/50 mt-2">
                  {s.stat2Label}
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-accent-foreground">
                  1
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-accent-foreground/50 mt-2">
                  {s.stat3Label}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/pistachio-grove.jpg"
              alt="Pistachio grove at golden hour in Bozova, Urfa"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
