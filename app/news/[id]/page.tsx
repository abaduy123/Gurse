'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getNewsById } from '@/app/actions/news'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header_Contact} from '@/components/header-contact'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// This component handles the content logic
function NewsContent() {
  const { id } = useParams()
  const { language, isRTL } = useLanguage()
  const router = useRouter()
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return
      const data = await getNewsById(id as string)
      setNews(data)
      setLoading(false)
    }
    fetchNews()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!news) return <div className="min-h-screen flex items-center justify-center">News not found.</div>

  // Select the correct language content
  const title = news[`title_${language}`] || news.title_en || news.title_ar || news.title_so
  const text = news[`text_${language}`] || news.text_en || news.text_ar || news.text_so

  return (
    // 1. Added w-full and overflow-x-hidden to fully lock the screen's canvas width on mobile
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 w-full overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* 2. Ensured layout container enforces strict bounds */}
      <div className="max-w-3xl mx-auto w-full min-w-0">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 gap-2">
          {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {isRTL ? "عودة" : "Back"}
        </Button>

        {/* 3. Added break-words to handle extremely long single-word titles or long translations */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 break-words tracking-tight">
          {title}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {new Date(news.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
        </p>

       
        <div 
          className="prose dark:prose-invert max-w-none w-full overflow-hidden break-words [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:list-inside [&_ul]:list-inside [&_ol]:ms-4 [&_ul]:ms-4 [&_*]:!max-w-full [&_*]:!h-auto [&_*]:!break-words"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  )
}

// This is the page wrapper
export default function NewsDetailsPage() {
  return (
    <LanguageProvider>
      <Header_Contact />
      <NewsContent />
      <Footer />
    </LanguageProvider>
  )
}