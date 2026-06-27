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

  const getLocalizedField = (item: any, field: 'title' | 'text') => {
    const primary = item[`${field}_${language}`]
    if (primary && primary !== '<p><br></p>' && primary.trim() !== '') return primary;
    return item[`${field}_en`] || item[`${field}_ar`] || item[`${field}_so`]
  }

  if (isLoading) return null 
  if (newsList.length === 0) return null 

  return (
    // Added w-full to guarantee the section doesn't exceed screen width
    <section id='latest-news' className="py-16 lg:py-40 bg-background w-full overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight gold-accent-line inline-block max-w-full break-words px-2">
            {isRTL ? "آخر الأخبار" : language === 'so' ? "Wararkii Ugu Dambeeyay" : "Latest News"}
          </h2>
        </div>

        {/* Added grid-cols-1 specifically for mobile safety, w-full to contain it */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {newsList.map((news) => (
            // CRITICAL FIX: Added className="block w-full min-w-0" to the Link tag
            <Link key={news.id} href={`/news/${news.id}`} className="block w-full min-w-0">
              <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-all h-full w-full">
                <div className="p-5 sm:p-6 flex-grow flex flex-col w-full overflow-hidden">
                  <p className="text-xs text-accent font-semibold mb-3 shrink-0">
                    {new Date(news.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 break-words shrink-0">
                    {getLocalizedField(news, 'title')}
                  </h3>
                  
                  {/* CRITICAL FIX: Added [&_*]:!max-w-full [&_*]:!h-auto to force all child HTML elements to stay inside */}
                  <div 
                    className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none line-clamp-3 break-words w-full overflow-hidden [&_*]:!max-w-full [&_*]:!h-auto [&_*]:!break-words"
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