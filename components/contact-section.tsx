"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Phone, MessageCircle, MapPin, Send, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import emailjs from "@emailjs/browser"

export default function ContactSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      await emailjs.sendForm(
        "service_fyeiefe",         
        "template_06re8bt",        
        formRef.current,
        "nUbu2migShmhmCuov"        
      )
      setSubmitStatus({ type: "success", message: isRTL ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!" })
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setSubmitStatus({ type: "error", message: isRTL ? "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا." : "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "966536458798",
      href: "tel:+966536458798",
    },
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: "966536458798",
      href: "https://wa.me/966536458798",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "gurasse99@gmail.com",
      href: "mailto:gurasse99@gmail.com",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Taif, Saudi Arabia",
      href: "/",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 bg-secondary relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? "rtl" : ""}`}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight gold-accent-line inline-block ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
            {t.contact.title}
          </h2>
          <span className={`block text-sm font-semibold text-accent tracking-wider uppercase mb-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            {t.contact.subtitle}
          </span>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 ${isRTL ? "lg:grid-flow-dense" : ""}`}>
          {/* Contact Info Panel */}
          <div className={`lg:col-span-2 ${isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"} ${isRTL ? "lg:col-start-4" : ""}`}>
            {/* Image Header */}
            <div className="relative h-48 rounded-t-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Modern Building" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Image src="/logo.png" alt="Gurase Properties" width={120} height={60} className="mx-auto mb-2" />
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className={`bg-card rounded-b-2xl border border-t-0 border-border p-6 ${
    isRTL ? "text-right" : "text-left"
  }`}>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a key={info.label} href={info.href} className={`card-hover group flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-accent/5 transition-all duration-300 ${isRTL ? "flex-row-reverse" : ""}`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300 icon-animate">
                      <info.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-base font-semibold text-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className={`mt-6 pt-6 border-t border-border flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Clock className="h-5 w-5 text-accent" />
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-medium text-foreground">{isRTL ? "ساعات العمل" : "Business Hours"}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? "الأحد - الخميس: 9 صباحاً - 6 مساءً" : "Sun - Thu: 9AM - 6PM"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-3 bg-card p-8 md:p-10 rounded-2xl border border-border shadow-lg ${isVisible ? "animate-slide-in-right animation-delay-300" : "opacity-0"} ${isRTL ? "lg:col-start-1" : ""}`}>
            <h3 className="text-2xl font-bold text-foreground mb-2">{isRTL ? "أرسل لنا رسالة" : "Send us a Message"}</h3>
            <p className="text-muted-foreground mb-8">{isRTL ? "سنعود إليك في أقرب وقت ممكن" : "We'll get back to you as soon as possible"}</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">{t.contact.nameLabel}</Label>
                  <Input id="name" name="name" type="text" placeholder={t.contact.namePlaceholder} required className="mt-2 bg-secondary border-border h-12" dir={isRTL ? "rtl" : "ltr"} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">{t.contact.emailLabel}</Label>
                  <Input id="email" name="email" type="email" placeholder={t.contact.emailPlaceholder} required className="mt-2 bg-secondary border-border h-12" dir="ltr" />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-foreground">{t.contact.phone}</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+966 5X XXX XXXX" className="mt-2 bg-secondary border-border h-12" dir="ltr" />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-semibold text-foreground">{t.contact.messageLabel}</Label>
                <Textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} required rows={5} className="mt-2 bg-secondary border-border resize-none" dir={isRTL ? "rtl" : "ltr"} />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 hover:cursor-pointer text-accent-foreground py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/20">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isRTL ? "جاري الإرسال..." : "Sending..."}
                  </span>
                ) : (
                  <span className={`flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Send className="h-5 w-5" />
                    {t.contact.submit}
                  </span>
                )}
              </Button>

              {/* Status Message */}
              {submitStatus.message && (
                <p className={`mt-4 text-center ${submitStatus.type === "success" ? "text-green-500" : "text-red-500"}`}>
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
