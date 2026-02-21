"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"

const t = {
  tr: {
    label: "Aileye Kat\u0131l",
    headline: "Hasad\u0131 ilk siz \u00F6\u011Frenin.",
    desc: "Yeni hasat, s\u0131n\u0131rl\u0131 parti ve bah\u00E7eden hikayeler i\u00E7in b\u00FCltenimize kaydolun.",
    subscribe: "Abone Ol",
    thanks: "Te\u015Fekk\u00FCrler. Sizinle ileti\u015Fime ge\u00E7ece\u011Fiz.",
    location: "Bozova, Urfa, T\u00FCrkiye",
    rights: "T\u00FCm haklar\u0131 sakl\u0131d\u0131r.",
    placeholder: "e-posta adresiniz",
  },
  en: {
    label: "Join the family",
    headline: "Be the first to know when we harvest.",
    desc: "Sign up for our newsletter and receive updates on new harvests, limited batches, and stories from the grove.",
    subscribe: "Subscribe",
    thanks: "Thank you. We will be in touch.",
    location: "Bozova, Urfa, Türkiye",
    rights: "All rights reserved.",
    placeholder: "your@email.com",
  },
}

export function EmailFooter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { lang } = useLanguage()
  const s = t[lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <footer id="footer" className="bg-accent text-accent-foreground">
      {/* Email capture */}
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-accent-foreground/50 mb-8">
            {s.label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-accent-foreground mb-6 text-balance">
            {s.headline}
          </h2>
          <p className="text-base text-accent-foreground/60 mb-12 max-w-md mx-auto leading-relaxed">
            {s.desc}
          </p>

          {submitted ? (
            <div className="py-4">
              <p className="text-sm tracking-[0.15em] uppercase text-accent-foreground/80">
                {s.thanks}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.placeholder}
                required
                className="flex-1 bg-transparent border border-accent-foreground/20 px-6 py-4 text-sm text-accent-foreground placeholder:text-accent-foreground/30 focus:outline-none focus:border-accent-foreground/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-accent-foreground text-accent px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent-foreground/90 transition-colors cursor-pointer shrink-0"
              >
                {s.subscribe}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent-foreground/10 px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg text-accent-foreground">Ural</p>
          <p className="text-xs text-accent-foreground/40 tracking-wide">
            {s.location} {"\u00B7"} {"\u00A9"} {new Date().getFullYear()} Ural. {s.rights}
          </p>
          {/* Instagram */}
          <a
            href="https://instagram.com/ural.bozova"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-accent-foreground/40 hover:text-accent-foreground transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
