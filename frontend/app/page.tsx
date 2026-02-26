import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "name": "GhostAuditAI",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                },
                "description": "Advanced AI detection and humanization tool for content creators. Verify authenticity and bypass AI detectors.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "1250",
                },
              },
              {
                "@type": "Organization",
                "name": "GhostAuditAI",
                "url": "https://ghostaudit.ai",
                "logo": "https://ghostaudit.ai/logo.png",
                "sameAs": [
                  "https://twitter.com/ghostauditai",
                  "https://github.com/ghostauditai",
                ],
              },
            ],
          }),
        }}
      />
    </main>
  )
}
