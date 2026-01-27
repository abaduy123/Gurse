"use client"

import { useEffect, useRef, useState } from "react"
import { Telescope, Lightbulb, Rocket, ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function VisionSection() {
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

  const visionItems = [
    {
      icon: Telescope,
      number: "01",
      title: t.vision.longTermVision,
      desc: t.vision.longTermVisionDesc,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    },
    {
      icon: Lightbulb,
      number: "02",
      title: t.vision.philosophy,
      desc: t.vision.philosophyDesc,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
    {
      icon: Rocket,
      number: "03",
      title: t.vision.futureGoals,
      desc: t.vision.futureGoalsDesc,
      image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&q=80",
    },
  ]

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? "rtl" : ""}`}>
        {/* Section Header */}
        <div className={`max-w-3xl mb-16 ${isRTL ? "mr-0 ml-auto text-right" : "ml-0 mr-auto text-left"}`}>
          <h2
            className={`text-3xl mb-6 md:text-4xl lg:text-5xl font-bold text-primary tracking-tight gold-accent-line inline-block ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
              }`}
          >
            {t.vision.title}
          </h2>
          <span
            className={`block text-sm font-semibold text-accent tracking-wider uppercase mb-4 ${isVisible ? "animate-fade-in" : "opacity-0"
              }`}
          >
            {t.vision.subtitle}
          </span>
          <p
            className={`text-muted-foreground text-base md:text-lg leading-relaxed mt-8 max-w-2xl ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
              }`}
          >
            {t.vision.description || "Building tomorrow's real estate landscape through strategic investments, innovative solutions, and unwavering commitment to excellence."}
          </p>
        </div>

        {/* Vision Items */}
        <div className="space-y-8 md:space-y-12">
          {visionItems.map((item, index) => (
            <div
              key={item.title}
              className={`card-hover bg-card border border-border rounded-2xl overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative h-64 lg:h-auto min-h-[300px] ${index % 2 === 1 && !isRTL ? "lg:col-start-2" : ""} ${index % 2 === 1 && isRTL ? "lg:col-start-1" : ""}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                  {/* Number Overlay */}
                  <div className={`absolute top-6 ${isRTL ? "right-6" : "left-6"} text-7xl md:text-8xl font-bold text-white/20`}>
                    {item.number}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center icon-animate">
                      <item.icon className="h-7 w-7 text-primary-foreground" />
                    </div>

                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div
                    className={`flex items-center cursor-pointer ${isRTL ? "flex-row-reverse" : ""
                      }`}
                  >
                    {/* Gold line */}
                    <span className="block w-6 h-0.5 bg-accent group-hover:scale-x-110 transition-transform"></span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-16 md:mt-20 relative rounded-2xl overflow-hidden ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"
            }`}
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="Modern Building"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {t.vision.ctaTitle || "Ready to Start Your Investment Journey?"}
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto whitespace-pre-line">
              {t.vision.ctaDesc}
            </p>



          </div>
        </div>
      </div>
    </section>
  )
}
