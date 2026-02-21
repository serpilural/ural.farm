"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-context"

const t = {
  tr: {
    text: "Bu web sitesi, deneyiminizi iyileştirmek amacıyla çerez kullanmaktadır. KVKK kapsamında kişisel verileriniz korunmaktadır.",
    accept: "Kabul Et",
    decline: "Reddet",
  },
  en: {
    text: "We use cookies to improve your experience. Your data is protected in accordance with applicable privacy law.",
    accept: "Accept",
    decline: "Decline",
  },
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { lang } = useLanguage()
  const s = t[lang]

  useEffect(() => {
    const consent = localStorage.getItem("ural_cookie_consent")
    if (!consent) {
      // Small delay so it doesn't flash on first render
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("ural_cookie_consent", "accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("ural_cookie_consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-5 bg-accent text-accent-foreground border-t border-accent-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
      <p className="text-xs text-accent-foreground/70 leading-relaxed max-w-xl">
        {s.text}
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleDecline}
          className="text-xs tracking-[0.15em] uppercase text-accent-foreground/40 hover:text-accent-foreground transition-colors cursor-pointer"
        >
          {s.decline}
        </button>
        <button
          onClick={handleAccept}
          className="text-xs tracking-[0.15em] uppercase bg-accent-foreground text-accent px-6 py-3 hover:bg-accent-foreground/90 transition-colors cursor-pointer"
        >
          {s.accept}
        </button>
      </div>
    </div>
  )
}
