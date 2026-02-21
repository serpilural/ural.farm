import { ShopPage } from "@/components/shop-page"
import { LanguageProvider } from "@/components/language-context"
import { Navbar } from "@/components/navbar"
import { CookieBanner } from "@/components/cookie-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop — Ural Pistachios",
  description: "Order fresh-harvest roasted Antep pistachios from Bozova, Urfa. Available in 250g, 500g and 1kg.",
}

export default function Shop() {
  return (
    <LanguageProvider>
      <Navbar />
      <ShopPage />
      <CookieBanner />
    </LanguageProvider>
  )
}
