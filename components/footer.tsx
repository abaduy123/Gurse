"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Phone, MessageCircle, MapPin, ArrowUp, MailIcon } from "lucide-react"

export function Footer() {
  const { t, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const quickLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.vision, href: "#vision" },
    { label: t.nav.contact, href: "/contact-section"},
    { label: t.nav.order_your_property, href: "#order-property" },
  ]

  return (
    <footer className="bg-primary">
      {/* Main Footer */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${isRTL ? "rtl" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt="Gurase Properties"
              width={150}
              height={50}
              className="h-14 w-auto mb-6"
            />
            <p className="text-primary-foreground/70 leading-relaxed max-w-md mb-6">
              {isRTL
                ? "جوراسه العقارية – شريكك الموثوق في تملك العقارات في السعودية. نوفّر حلولًا سلسة وآمنة لمساعدة الأجانب على امتلاك العقارات بكل ثقة ووضوح."
                : "Gurase Properties – Your trusted partner for property ownership in Saudi Arabia. We provide smooth and secure solutions to help foreigners own real estate with confidence and clarity."}
            </p>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <a
                href="https://wa.me/966536458798"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </a>
              <a
                href="tel:+966536458798"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Phone className="h-5 w-5 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-6">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-6">
              {t.contact.title}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70" dir={isRTL ? "ltr" : "ltr"}>
                  +966 536458798
                </span>
              </li>

              {/* WhatsApp / Message */}
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70" dir={isRTL ? "ltr" : "ltr"}>
                  +966 536458798
                </span>
              </li>
              <li className={`flex items-start gap-3`}>
                <MailIcon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">gurasse99@gmail.com</span>
              </li>
              <li className={`flex items-start gap-3 `}>
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">Taif, Saudi Arabia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isRTL ? "rtl" : ""}`}>
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Gurase Properties LT. {t.footer.rights}
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-300 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>{isRTL ? "العودة للأعلى" : "Back to Top"}</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
