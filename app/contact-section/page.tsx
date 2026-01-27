// app/contact/page.tsx
"use client"
import ContactSection from "@/components/contact-section";
import { Header_Contact } from "@/components/header-contact";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/language-context";

export default function ContactPage() {
    return (
    <LanguageProvider>
        <Header_Contact />
        <ContactSection />
        <Footer />
    </LanguageProvider>

    )
}

