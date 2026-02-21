"use client"

import { useLanguage } from "./language-context"

const t = {
  tr: {
    location: "Bozova, Urfa \u2014 T\u00FCrkiye",
    headline1: "A\u011Fa\u00E7lar\u0131m\u0131zdan.",
    headline2: "Sofran\u0131za.",
    subtitle: "Eyl\u00FCl\u2019de hasat edilir. K\u00FC\u00E7\u00FCk partiler halinde kavrulur. Haftalar i\u00E7inde kap\u0131n\u0131zda.",
    cta: "Ke\u015Ffet",
  },
  en: {
    location: "Bozova, Urfa \u2014 Türkiye",
    headline1: "From our trees.",
    headline2: "To your table.",
    subtitle: "Harvested in September. Roasted in small batches. At your door within weeks.",
    cta: "Discover",
  },
}

export function Hero() {
  const { lang } = useLanguage()
  const s = t[lang]

  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 md:mb-8">
          {s.location}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-accent max-w-4xl text-balance">
          {s.headline1}
          <br />
          {s.headline2}
        </h1>
        <p className="mt-8 md:mt-10 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
          {s.subtitle}
        </p>
        <a
          href="#product"
          className="mt-10 md:mt-12 inline-block bg-accent text-accent-foreground px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent/90 transition-colors"
        >
          {s.cta}
        </a>
      </div>
    </section>
  )
}
