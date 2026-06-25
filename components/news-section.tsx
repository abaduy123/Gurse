'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { getNews } from '@/app/actions/news'
import Link from 'next/link'

export function NewsSection() {
  const { language, isRTL, t } = useLanguage()
  const [newsList, setNewsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews()
      setNewsList(data)
      setIsLoading(false)
    }
    fetchNews()
  }, [])

  // Helper to fallback to English, then Arabic, then Somali if the selected lang is empty
  const getLocalizedField = (item: any, field: 'title' | 'text') => {
    const primary = item[`${field}_${language}`]
    if (primary && primary !== '<p><br></p>' && primary.trim() !== '') return primary;
    return item[`${field}_en`] || item[`${field}_ar`] || item[`${field}_so`]
  }

  if (isLoading) return null // Or a spinner
  if (newsList.length === 0) return null // Hide section if no news

  return (
    <section id='latest-news' className="py-40 bg-background " dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight gold-accent-line inline-block">
            {isRTL ? "آخر الأخبار" : language === 'so' ? "Wararkii Ugu Dambeeyay" : "Latest News"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            // 2. Wrap the card in a Link
            <Link key={news.id} href={`/news/${news.id}`}>
              <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-all h-full">
                <div className="p-6 flex-grow">
                  <p className="text-xs text-accent font-semibold mb-3">
                    {new Date(news.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {getLocalizedField(news, 'title')}
                  </h3>
                  <div 
                    className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: getLocalizedField(news, 'text') }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}