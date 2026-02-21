"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-context"
import { UralLogo } from "./ural-logo"

const t = {
  tr: { story: "Hikayemiz", shop: "Mağaza", contact: "\u0130leti\u015Fim" },
  en: { story: "Our Story", shop: "Shop", contact: "Contact" },
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const strings = t[lang]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <a href="#" className="text-accent">
        <UralLogo />
      </a>
      <div className="hidden md:flex items-center gap-10">
        <a
          href="/#story"
          className="text-xs tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors"
        >
          {strings.story}
        </a>
        <a
          href="/shop"
          className="text-xs tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors"
        >
          {strings.shop}
        </a>
        <a
          href="/#footer"
          className="text-xs tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors"
        >
          {strings.contact}
        </a>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          className="text-xs tracking-[0.15em] uppercase text-accent/70 hover:text-accent transition-colors cursor-pointer"
        >
          <span className={lang === "tr" ? "text-accent font-medium" : "text-accent/40"}>
            TR
          </span>
          <span className="text-accent/30 mx-1">/</span>
          <span className={lang === "en" ? "text-accent font-medium" : "text-accent/40"}>
            EN
          </span>
        </button>
      </div>
    </nav>
  )
}
