"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/lib/language-context"

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "so", label: "Soomaali", flag: "SO" },
  { code: "en", label: "English", flag: "EN" },
  { code: "ar", label: "العربية", flag: "SA" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  const navItems = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#vision", label: t.nav.vision },
    { href: "/contact-section", label: t.nav.contact },
    { href: "#order-property", label: t.nav.order_your_property },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Gurase Properties"
              width={140}
              height={50}
              className="h-12 md:h-14 lg:h-16 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navItems.map((item) => (
              <a
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  <span className="hidden sm:inline text-sm">
                    {languages.find((l) => l.code === language)?.label}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-accent/10" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
