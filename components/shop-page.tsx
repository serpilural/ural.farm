"use client"

import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "./language-context"

const nutrition = {
  calories: 172,
  macros: [
    { key: "protein", pct: 53, color: "bg-green-700/60" },
    { key: "fat",     pct: 80, color: "bg-amber-700/60" },
    { key: "carbs",   pct: 27, color: "bg-stone-400/60" },
  ],
  rows: [
    { key: "energy",    unit: "kcal", val: "172"  },
    { key: "fat",       unit: "g",    val: "13.9" },
    { key: "saturated", unit: "g",    val: "1.7"  },
    { key: "carbs",     unit: "g",    val: "8.4"  },
    { key: "sugar",     unit: "g",    val: "2.2"  },
    { key: "fiber",     unit: "g",    val: "3.1"  },
    { key: "protein",   unit: "g",    val: "6.1"  },
    { key: "salt",      unit: "mg",   val: "175"  },
    { key: "potassium", unit: "mg",   val: "370"  },
    { key: "magnesium", unit: "mg",   val: "34"   },
    { key: "vitB6",     unit: "mg",   val: "0.4"  },
  ],
}

const nutritionLabels = {
  tr: {
    toggle: "Besin Değerleri",
    energy: "Enerji", fat: "Yağ", saturated: "— Doymuş yağ",
    carbs: "Karbonhidrat", sugar: "— Şeker", fiber: "Lif",
    protein: "Protein", salt: "Tuz (sodyum)", potassium: "Potasyum",
    magnesium: "Magnezyum", vitB6: "Vitamin B6",
    macroProtein: "Protein", macroFat: "Yağ", macroCarbs: "Karbonhidrat",
    note: "Değerler ortalama referans değerlerdir.",
  },
  en: {
    toggle: "Nutrition Facts",
    energy: "Energy", fat: "Fat", saturated: "— of which saturated",
    carbs: "Carbohydrates", sugar: "— of which sugars", fiber: "Dietary Fibre",
    protein: "Protein", salt: "Salt (sodium)", potassium: "Potassium",
    magnesium: "Magnesium", vitB6: "Vitamin B6",
    macroProtein: "Protein", macroFat: "Fat", macroCarbs: "Carbs",
    note: "Values are average reference figures.",
  },
}

const per100 = (val: string) => (parseFloat(val) * (100 / 30)).toFixed(1).replace(/\.0$/, "")

const paymentMethods = [
  { id: "visa",       label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "troy",       label: "Troy" },
  { id: "iyzico",     label: "iyzico" },
  { id: "paytr",      label: "PayTR" },
  { id: "eft",        label: "Havale / EFT" },
  { id: "whatsapp",   label: "WhatsApp" },
]

const t = {
  tr: {
    badge:      "Hasat 2026 — Yak\u0131nda",
    headline:   "Kavrulmu\u015F Antep F\u0131st\u0131\u011F\u0131",
    sub:        "Bozova, Urfa \u2014 T\u00FCrkiye",
    desc:       "Elle se\u00E7ilmi\u015F, k\u00FC\u00E7\u00FCk parti halinde kavrulmu\u015F, Anadolu deniz tuzu ile hafif\u00E7e tuzlanm\u0131\u015F. 26 Eyl\u00FCl 2026 hasat\u0131ndan gelen ilk partiden sipari\u015F olu\u015Fturun.",
    sizeLabel:  "Boyut Se\u00E7in",
    sizes: [
      {
        id: "250",
        weight: "250g",
        desc: "Deneme paketi \u2014 bir avutu\u015Fun keyfini \u00E7\u0131kar\u0131n",
        price: "TBD",
        badge: "",
      },
      {
        id: "500",
        weight: "500g",
        desc: "En \u00E7ok tercih edilen \u2014 aile i\u00E7in ideal",
        price: "TBD",
        badge: "En Popüler",
      },
      {
        id: "1000",
        weight: "1 kg",
        desc: "Tam paket \u2014 hediye veya stok i\u00E7in",
        price: "TBD",
        badge: "",
      },
    ],
    specs: [
      ["K\u00F6ken",   "Bozova, Urfa"],
      ["Hasat",        "26 Eyl\u00FCl 2026"],
      ["Kavurma",      "K\u00FC\u00E7\u00FCk parti"],
      ["Tuz",          "Anadolu deniz tuzu"],
      ["Depolama",     "Serin ve kuru yerde saklay\u0131n"],
      ["Raf \u00F6mr\u00FC", "Hasattan 6 ay"],
    ] as [string, string][],
    cta:        "Sipari\u015F Ver (Yak\u0131nda)",
    ctaWa:      "WhatsApp ile Sipari\u015F Ver",
    notify:     "Haberdar Et",
    notifyDesc: "Sat\u0131\u015F ba\u015Flad\u0131\u011F\u0131nda sizi bilgilendirece\u011Fiz.",
    notifyBtn:  "E-posta ile bildir",
    notifyPlaceholder: "e-posta adresiniz",
    notifyThanks: "Te\u015Fekk\u00FCrler! Sat\u0131\u015F ba\u015Flad\u0131\u011F\u0131nda haber verece\u011Fiz.",
    back:       "\u2190 Ana Sayfa",
    payment:    "G\u00FCvenli \u00F6deme",
    shipping:   "Kargo & Teslimat",
    shippingDesc: "T\u00FCrkiye geneli kargo. Sipari\u015F olu\u015Ftuktan sonra detaylar paylas\u0131lacakt\u0131r.",
    guarantee:  "Kalite Garantisi",
    guaranteeDesc: "Memnun kalmazsan\u0131z, \u00FCr\u00FCn\u00FC iade edebilirsiniz.",
  },
  en: {
    badge:      "Harvest 2026 — Coming Soon",
    headline:   "Roasted Pistachios",
    sub:        "Bozova, Urfa \u2014 T\u00FCrkiye",
    desc:       "Hand-selected, small batch roasted, lightly salted with Anatolian sea salt. Pre-order from the first batch of our September 26, 2026 harvest.",
    sizeLabel:  "Choose your size",
    sizes: [
      {
        id: "250",
        weight: "250g",
        desc: "Taster pack \u2014 a perfect first handful",
        price: "TBD",
        badge: "",
      },
      {
        id: "500",
        weight: "500g",
        desc: "Most popular \u2014 ideal for the family",
        price: "TBD",
        badge: "Most Popular",
      },
      {
        id: "1000",
        weight: "1 kg",
        desc: "Full batch \u2014 for gifting or stocking up",
        price: "TBD",
        badge: "",
      },
    ],
    specs: [
      ["Origin",   "Bozova, Urfa"],
      ["Harvest",  "September 26, 2026"],
      ["Roast",    "Small batch"],
      ["Salt",     "Anatolian sea salt"],
      ["Storage",  "Store in a cool, dry place"],
      ["Shelf life", "6 months from harvest"],
    ] as [string, string][],
    cta:        "Place Order (Coming Soon)",
    ctaWa:      "Order via WhatsApp",
    notify:     "Get Notified",
    notifyDesc: "We\u2019ll let you know the moment orders open.",
    notifyBtn:  "Notify me by email",
    notifyPlaceholder: "your@email.com",
    notifyThanks: "Thank you! We\u2019ll be in touch when orders open.",
    back:       "\u2190 Back to Home",
    payment:    "Secure payment",
    shipping:   "Shipping & Delivery",
    shippingDesc: "Shipping across T\u00FCrkiye. Details will be shared once orders open.",
    guarantee:  "Quality Guarantee",
    guaranteeDesc: "Not satisfied? We\u2019ll make it right.",
  },
}

export function ShopPage() {
  const { lang } = useLanguage()
  const s = t[lang]
  const [selectedSize, setSelectedSize] = useState("500")
  const [email, setEmail] = useState("")
  const [notified, setNotified] = useState(false)
  const [nutritionOpen, setNutritionOpen] = useState(false)
  const [activeImage, setActiveImage] = useState("/images/pistachios-product.jpg")
  const [zoomOpen, setZoomOpen] = useState(false)
  const n = nutritionLabels[lang]

  const thumbnails = [
    { src: "/images/pistachios-product.jpg", alt: "Roasted Antep pistachios" },
    { src: "/images/hero-pistachios.jpg",    alt: "Pistachio close-up" },
  ]

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setNotified(true); setEmail("") }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Back link */}
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <a
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          {s.back}
        </a>
      </div>

      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Image */}
          <div className="lg:sticky lg:top-28 space-y-4">
            {/* Main image with zoom button */}
            <div className="relative aspect-square w-full group">
              <Image
                src={activeImage}
                alt="Roasted Antep pistachios"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Zoom button */}
              <button
                onClick={() => setZoomOpen(true)}
                aria-label="Zoom image"
                className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm border border-border w-9 h-9 flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8 1h5v5M6 8L13 1M1 6v7h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Thumbnail strip — 2 images */}
            <div className="grid grid-cols-2 gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.src}
                  onClick={() => setActiveImage(thumb.src)}
                  className={`relative aspect-square w-full transition-all cursor-pointer ${
                    activeImage === thumb.src
                      ? "ring-2 ring-accent opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" sizes="25vw" />
                </button>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          {zoomOpen && (
            <div
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setZoomOpen(false)}
            >
              <button
                onClick={() => setZoomOpen(false)}
                aria-label="Close zoom"
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-border text-accent hover:bg-muted transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div
                className="relative w-full max-w-3xl aspect-square"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage}
                  alt="Roasted Antep pistachios — zoomed"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          )}

          {/* Right — Product info */}
          <div>
            {/* Harvest badge */}
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-primary border border-primary/40 px-3 py-1.5 mb-6">
              {s.badge}
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-accent mb-3">
              {s.headline}
            </h1>
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">{s.sub}</p>
            <p className="text-base leading-relaxed text-muted-foreground mb-10 max-w-md">{s.desc}</p>

            {/* Size selector */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{s.sizeLabel}</p>
              <div className="grid grid-cols-3 gap-3">
                {s.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`relative flex flex-col items-start p-4 border text-left transition-all cursor-pointer ${
                      selectedSize === size.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-accent/50 text-accent"
                    }`}
                  >
                    {size.badge && (
                      <span className={`absolute -top-2.5 left-3 text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${
                        selectedSize === size.id ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        {size.badge}
                      </span>
                    )}
                    <span className="font-serif text-xl mb-1">{size.weight}</span>
                    <span className={`text-[11px] leading-snug ${selectedSize === size.id ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                      {size.desc}
                    </span>
                    <span className={`mt-3 text-xs tracking-widest font-medium ${selectedSize === size.id ? "text-accent-foreground/50" : "text-muted-foreground/60"}`}>
                      {size.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-6 mb-8 flex flex-col gap-3">
              {s.specs.map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</p>
                  <p className="text-sm text-accent">{value}</p>
                </div>
              ))}
            </div>

            {/* Nutrition accordion */}
            <div className="border-t border-border mb-8">
              <button
                onClick={() => setNutritionOpen(!nutritionOpen)}
                className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-accent transition-colors">
                  {n.toggle}
                </p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className={`text-muted-foreground/50 transition-transform duration-300 ${nutritionOpen ? "rotate-180" : ""}`}>
                  <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {nutritionOpen && (
                <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-end gap-2 mb-5">
                    <span className="font-serif text-5xl text-accent leading-none">{nutrition.calories}</span>
                    <span className="text-xs text-muted-foreground mb-1.5">kcal / 30g</span>
                  </div>
                  <div className="flex gap-3 mb-6">
                    {nutrition.macros.map((m) => (
                      <div key={m.key} className="flex-1">
                        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-1.5">
                          <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                        </div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70">
                          {m.key === "protein" ? n.macroProtein : m.key === "fat" ? n.macroFat : n.macroCarbs}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border border-border rounded">
                    <div className="grid grid-cols-3 px-4 py-2.5 border-b border-border bg-muted/30">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground col-span-1"></p>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-right">30g</p>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-right">100g</p>
                    </div>
                    {nutrition.rows.map((row, i) => (
                      <div key={row.key}
                        className={`grid grid-cols-3 px-4 py-2.5 ${i < nutrition.rows.length - 1 ? "border-b border-border/50" : ""} ${row.key === "saturated" || row.key === "sugar" ? "bg-muted/10" : ""}`}>
                        <p className="text-xs text-muted-foreground col-span-1">{n[row.key as keyof typeof n] as string}</p>
                        <p className="text-xs text-accent text-right font-medium">{row.val}{row.unit}</p>
                        <p className="text-xs text-muted-foreground/60 text-right">{per100(row.val)}{row.unit}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground/40 mt-3 leading-relaxed">{n.note}</p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                disabled
                className="w-full bg-accent text-accent-foreground px-10 py-4 text-xs tracking-[0.25em] uppercase opacity-50 cursor-not-allowed"
              >
                {s.cta}
              </button>
              <a
                href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20Ural%20f%C4%B1st%C4%B1k%20sipari%C5%9Fi%20vermek%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 border border-border px-10 py-4 text-xs tracking-[0.25em] uppercase text-accent hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M14.5 12.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.4-.1-.3-.1-.7-.2-1.2-.5-2.1-1-3.5-3.1-3.6-3.3-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.5-.3.7-.3h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.1.3 0 .4.4.6.9 1.2 1.4 1.6.5.4 1.1.7 1.6.9.1.1.3 0 .4-.1l.4-.5c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.3.3.5l-.1.5z" fill="currentColor"/>
                </svg>
                {s.ctaWa}
              </a>
            </div>

            {/* Email notify */}
            <div className="border border-border p-6 mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-1">{s.notify}</p>
              <p className="text-sm text-muted-foreground mb-4">{s.notifyDesc}</p>
              {notified ? (
                <p className="text-xs tracking-[0.15em] uppercase text-primary">{s.notifyThanks}</p>
              ) : (
                <form onSubmit={handleNotify} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={s.notifyPlaceholder}
                    required
                    className="flex-1 bg-transparent border border-border px-4 py-2.5 text-sm text-accent placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-accent text-accent-foreground px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors cursor-pointer shrink-0"
                  >
                    {s.notifyBtn}
                  </button>
                </form>
              )}
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3 items-start">
                <svg className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.4 7.3H18L13.6 10.6L15.5 16L10 12.7L4.5 16L6.4 10.6L2 7.3H7.6L10 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-accent mb-1">{s.guarantee}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.guaranteeDesc}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <svg className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="7" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-accent mb-1">{s.shipping}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.shippingDesc}</p>
                </div>
              </div>
            </div>

            {/* Payment badges */}
            <div className="border-t border-border pt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">{s.payment}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {paymentMethods.map((m) => (
                  <span
                    key={m.id}
                    className="text-[11px] px-2.5 py-1 border border-border text-muted-foreground/50 tracking-wide"
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
