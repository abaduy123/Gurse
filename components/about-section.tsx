"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Heart, BadgeCheck, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function AboutSection() {
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

  const values = [
    {
      icon: Target,
      title: t.about.mission,
      desc: t.about.missionDesc,
    },
    {
      icon: Heart,
      title: t.about.values,
      desc: t.about.valuesDesc,
    },
    {
      icon: BadgeCheck,
      title: t.about.trust,
      desc: t.about.trustDesc,
    },
  ]

  const trustPoints = [
    t.about.trustPoint1,
    t.about.trustPoint2, 
    t.about.trustPoint3,
    t.about.trustPoint4  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-40 lg:pt-52 pb-20 md:pb-28 bg-secondary"
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? "rtl" : ""}`}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight gold-accent-line inline-block ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            {t.about.title}
          </h2>
          <span
            className={`block text-sm font-semibold text-accent tracking-wider uppercase mb-4 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            {t.about.subtitle}
          </span>
          <p
            className={`text-muted-foreground text-base md:text-lg leading-relaxed mt-8 ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            {t.about.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image Grid */}
          <div
            className={`relative ${isRTL ? "lg:order-2" : ""} ${
              isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/pa1.webp"
                    alt="Dubai Skyline"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-32 md:h-40 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/pa2.webp"
                    alt="Modern Office Building"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 md:h-40 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/pa3.webp"
                    alt="Luxury Tower"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/pa4.webp"
                    alt="Modern Architecture"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Stats Overlay Card */}
            <div className="absolute -bottom-6 -right-4 md:right-4 bg-primary text-primary-foreground p-6 rounded-xl shadow-2xl">
              <div className="text-3xl md:text-4xl font-bold text-accent">15+</div>
              <div className="text-sm text-primary-foreground/80">
                {t.about.yearsExperience || "Years of Excellence"}
              </div>
            </div>
          </div>

          {/* Trust Content */}
          <div className={`${isRTL ? "lg:order-1" : ""} ${isVisible ? "animate-slide-in-right animation-delay-300" : "opacity-0"}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              {t.about.whyChooseUs || "Why Choose Us"}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t.about.whyChooseUsDesc || "With over a decade of experience in the Saudi real estate market, we have built a reputation for excellence, integrity, and exceptional returns on investment."}
            </p>
            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <div
                  key={point}
                  className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5 icon-animate" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`card-hover bg-card p-8 rounded-xl border border-border ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mb-6 icon-animate">
                <value.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-16 bg-primary rounded-2xl p-8 md:p-10 ${
            isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { number: "15+", label: t.about.statsYears || "Years Experience" },
             
              { number: "98%", label: t.about.statsSatisfaction || "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
