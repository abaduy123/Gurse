"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Send } from "lucide-react"
import regions from "@/lib/regions.json"
import cities from "@/lib/cities.json"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import { SearchableSelect } from "@/components/ui/SearchableSelect"
import emailjs from "@emailjs/browser"

export function Order_Your_Property_Section() {
  const { language, isRTL, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  const [regionId, setRegionId] = useState<number>()
  const [cityId, setCityId] = useState<number>()
  const [propertyType, setPropertyType] = useState<string>()
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    sectionRef.current && observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* ---------------- Options ---------------- */
  const regionOptions = regions.map((r: any) => ({
    value: r.region_id,
    label: language === "ar" ? r.name.ar : r.name.en,
  }))

  const cityOptions = cities
    .filter((c: any) => c.region_id === regionId)
    .map((c: any) => ({
      value: c.city_id,
      label: language === "ar" ? c.name.ar : c.name.en,
    }))

  const propertyTypeOptions = [
    { value: "apartment", ar: "شقة", en: "Apartment" },
    { value: "villa", ar: "فيلا", en: "Villa" },
    { value: "land", ar: "أرض", en: "Land" },
    { value: "building", ar: "عمارة", en: "Residential Building" },
  ].map((p) => ({
    value: p.value,
    label: language === "ar" ? p.ar : p.en,
  }))

  /* ---------------- Validation ---------------- */
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(regex.test(email) ? "" : (isRTL ? "البريد الإلكتروني غير صحيح" : "Invalid email"))
  }

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    if (emailError) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      await emailjs.sendForm(
        "service_fyeiefe",
        "template_rbsffpf",
        formRef.current,
        "nUbu2migShmhmCuov"
      )
      setSubmitStatus({ type: "success", message: isRTL ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!" })
      formRef.current.reset()
      setRegionId(undefined)
      setCityId(undefined)
      setPropertyType(undefined)
    } catch (err) {
      console.error(err)
      setSubmitStatus({ type: "error", message: isRTL ? "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا." : "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-secondary relative overflow-hidden"
      id="order-property"
    >
      <div className={`relative max-w-7xl mx-auto px-4 ${isRTL ? "rtl" : ""}`}>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase">
            {t.nav.order_your_property}
          </span>
          <h2 className="text-4xl font-bold text-primary mt-2">
            {t.order_your_property.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Image */}
          <div className={`lg:col-span-2 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                alt="Property"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/60" />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 bg-card p-8 md:p-10 rounded-2xl border shadow-lg ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

              {/* Names */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>{t.order_your_property.firstNameLabel}</Label>
                  <Input
                    name="firstName"
                    required
                    className="mt-2 h-12 bg-secondary"
                    placeholder={t.order_your_property.firstNamePlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.order_your_property.lastNameLabel}</Label>
                  <Input
                    name="lastName"
                    required
                    className="mt-2 h-12 bg-secondary"
                    placeholder={t.order_your_property.lastNamePlaceholder}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>{t.order_your_property.phone}</Label>
                  <Input
                    name="phone"
                    required
                    type="tel"
                    dir="ltr"
                    className="mt-2 h-12 bg-secondary"
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>

                <div>
                  <Label>{t.order_your_property.emailLabel}</Label>
                  <Input
                    name="email"
                    required
                    type="email"
                    dir="ltr"
                    className="mt-2 h-12 bg-secondary"
                    placeholder={t.order_your_property.emailPlaceholder}
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Region & City */}
              <div className="grid md:grid-cols-2 gap-6">
                <SearchableSelect
                  options={regionOptions}
                  value={regionId}
                  onChange={(v) => {
                    setRegionId(v)
                    setCityId(undefined)
                  }}
                  placeholder={t.order_your_property.regionPlaceholder}
                />
                <input
                  type="hidden"
                  name="region"
                  value={regionOptions.find(o => o.value === regionId)?.label ?? ""}
                />

                <SearchableSelect
                  options={cityOptions}
                  value={cityId}
                  onChange={setCityId}
                  disabled={!regionId}
                  placeholder={regionId ? t.order_your_property.cityPlaceholder : t.order_your_property.cityPlaceholderDisabled}
                />
                <input
                  type="hidden"
                  name="city"
                  value={cityOptions.find(o => o.value === cityId)?.label ?? ""}
                />
              </div>

              {/* Property Type */}
              <SearchableSelect
                options={propertyTypeOptions}
                value={propertyType}
                onChange={setPropertyType}
                placeholder={t.order_your_property.propertyTypePlaceholder}
              />
              <input
                type="hidden"
                name="propertyType"
                value={propertyTypeOptions.find(o => o.value === propertyType)?.label ?? ""}
              />

              {/* Numbers */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="numberOfRooms"
                  required
                  inputMode="numeric"
                  placeholder={isRTL ? "عدد الغرف" : language === "so" ? "Tirada qolalka" : "Number of rooms"}
                />
                <Input
                  name="numberOfBathrooms"
                  required
                  inputMode="numeric"
                  placeholder={isRTL ? "عدد دورات المياه" : language === "so" ? "Tirada musqulaha" : "Number of bathrooms"}
                />

                <div className="relative">
                  <Input
                    name="space"
                    required
                    inputMode="decimal"
                    placeholder={isRTL ? "المساحة" : language === "so" ? "Aagga" : "Space"}
                  />
                  <span className={`absolute top-3 text-muted-foreground ${isRTL ? "left-3" : "right-3"}`}>㎡</span>
                </div>

                <Input
                  name="expectedPrice"
                  required
                  inputMode="decimal"
                  placeholder={isRTL ? "السعر المتوقع" : language === "so" ? "Qiimaha la filayo" : "Expected price"}
                />
              </div>

              {/* Notes */}
              <div>
                <Label>{t.order_your_property.messageLabel}</Label>
                <Textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-2 bg-secondary border-border resize-none"
                  placeholder={t.order_your_property.messagePlaceholder}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-base font-semibold bg-accent hover:bg-accent/90 cursor-pointer"
              >
                <Send className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {isSubmitting ? (isRTL ? "جاري الإرسال..." : "Sending...") : t.order_your_property.submit}
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
