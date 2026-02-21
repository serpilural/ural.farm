"use client"

import Image from "next/image"
import { useLanguage } from "./language-context"

const t = {
  tr: {
    sectionLabel: "Tek Orijin \u2014 K\u00FC\u00E7\u00FCk Parti",
    label: "\u0130mza \u00DCr\u00FCn\u00FCm\u00FCz",
    name: "Kavrulmu\u015F Antep F\u0131st\u0131\u011F\u0131",
    desc: "Elle se\u00E7ilmi\u015F, k\u00FC\u00E7\u00FCk parti halinde kavrulmu\u015F, Anadolu deniz tuzu ile hafif\u00E7e tuzlanm\u0131\u015F. 250g, 500g ve 1kg se\u00E7enekleriyle.",
    cta: "Ma\u011Fazaya Git \u2192",
    harvest: "Hasat: 26 Eyl\u00FCl 2026",
  },
  en: {
    sectionLabel: "Single Origin \u2014 Small Batch",
    label: "Our Signature",
    name: "Roasted Pistachios",
    desc: "Hand-selected, small batch roasted, lightly salted with Anatolian sea salt. Available in 250g, 500g and 1kg.",
    cta: "Go to Shop \u2192",
    harvest: "Harvest: September 26, 2026",
  },
}

export function ProductTeaser() {
  const { lang } = useLanguage()
  const s = t[lang]

  return (
    <section id="product" className="bg-background">
      <div className="px-6 md:px-12 py-16 md:py-20 border-b border-border">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground">
          {s.sectionLabel}
        </p>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Image — compact */}
          <div className="relative w-full md:w-72 lg:w-80 aspect-square shrink-0">
            <Image
              src="/images/pistachios-product.jpg"
              alt="Roasted Antep pistachios"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">{s.label}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-accent mb-4">
              {s.name}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-2 max-w-lg">{s.desc}</p>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground/50 mb-8">{s.harvest}</p>
            <a
              href="/shop"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors"
            >
              {s.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
