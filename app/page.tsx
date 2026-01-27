"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VisionSection } from "@/components/vision-section"

import {Order_Your_Property_Section} from "@/components/order_property_section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        
        <main>
          <Header />
          <HeroSection />
          <AboutSection />
          <VisionSection />
          <Order_Your_Property_Section/>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
