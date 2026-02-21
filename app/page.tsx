import { LanguageProvider } from "@/components/language-context"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BrandStory } from "@/components/brand-story"
import { ProductTeaser } from "@/components/product-teaser"
import { EmailFooter } from "@/components/email-footer"
import { CookieBanner } from "@/components/cookie-banner"

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <Navbar />
        <Hero />
        <BrandStory />
        <ProductTeaser />
        <EmailFooter />
        <CookieBanner />
      </main>
    </LanguageProvider>
  )
}
