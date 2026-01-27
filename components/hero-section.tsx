"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, TrendingUp, HeadphonesIcon, Building2, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Shield,
      title: t.hero.feature1Title,
      desc: t.hero.feature1Desc,
    },
    {
      icon: TrendingUp,
      title: t.hero.feature2Title,
      desc: t.hero.feature2Desc,
    },
    {
      icon: HeadphonesIcon,
      title: t.hero.feature3Title,
      desc: t.hero.feature3Desc,
    },
  ]

  const highlights = [
    { icon: Building2, value: "100+", label: t.hero.highlightProperties || "Premium Properties" },
    
    { icon: Award, value: "15+", label: t.hero.highlightYears || "Years Excellence" },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/riyadh_saudi.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
         
        >
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 video-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 md:py-40">
        <div className={`max-w-4xl ${isRTL ? "mr-0 ml-auto text-right" : "ml-0 mr-auto text-left"}`}>
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium">
              {t.hero.badge || "Your Trusted Investment Partner"}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {t.hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`mt-6 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed text-pretty ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            {t.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col sm:flex-row gap-4 ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 animate-pulse-glow"
            >
              <a href="#order-property">{t.hero.cta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300"
            >
              <a href="#about">{t.hero.ctaSecondary || "Learn More"}</a>
            </Button>
          </div>

          {/* Highlights */}
          <div
            className={`mt-16 grid grid-cols-3 gap-6 md:gap-10 max-w-xl ${
              isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
            }`}
          >
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="text-center"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-2">
                  <item.icon className="h-5 w-5 text-accent icon-animate" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-xs md:text-sm text-white/60 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Feature Cards - Below Hero */}
      <div className="absolute -bottom-32 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 hidden lg:block">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-3 gap-6 ${isRTL ? "rtl" : ""}`}>
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card-hover bg-white p-6 rounded-xl shadow-xl border border-border ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 icon-animate">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
