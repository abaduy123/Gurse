'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { addNewsTransaction, getNews, deleteNews, updateNews } from '@/app/actions/news'
import { Header_Contact } from '@/components/header-contact'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LanguageProvider } from '@/lib/language-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast, Toaster } from 'sonner'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function AdminDashboard() {
 const [formData, setFormData] = useState({ title_so: '', text_so: '', title_en: '', text_en: '', title_ar: '', text_ar: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("create")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newsList, setNewsList] = useState<any[]>([])

  // Fetch news on mount
  useEffect(() => { loadNews() }, [])

  const loadNews = async () => {
    const data = await getNews()
    setNewsList(data)
  }

  const handleEdit = (news: any) => {
    setFormData({
      title_so: news.title_so, text_so: news.text_so,
      title_en: news.title_en, text_en: news.text_en,
      title_ar: news.title_ar, text_ar: news.text_ar
    })
    setEditingId(news.id)
    setActiveTab("create")
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this?')) return
    const res = await deleteNews(id)
    if (res.success) {
      toast.success('News deleted!')
      loadNews()
    } else {
      toast.error('Delete failed.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ title_so: '', text_so: '', title_en: '', text_en: '', title_ar: '', text_ar: '' })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const res = editingId 
      ? await updateNews(editingId, formData)
      : await addNewsTransaction(formData)

    if (res.success) {
      toast.success(editingId ? 'News updated!' : 'News published!')
      handleCancel()
      loadNews()
    } else {
      toast.error('Action failed: ' + res.error)
    }
    setIsSubmitting(false)
  }

  return (
    <LanguageProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col bg-background">
        <Header_Contact />
        <main className="flex-grow pt-28 pb-20 px-4 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create">{editingId ? 'Edit News' : 'Publish News'}</TabsTrigger>
              <TabsTrigger value="manage">Manage News</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* English Section */}
                <div className="bg-card p-6 rounded-xl border shadow-lg space-y-4" dir="ltr">
                  <h2 className="text-xl font-bold">English Content</h2>
                  <Input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} placeholder="Title (EN)" />
                  <div className="bg-white text-black rounded-md overflow-hidden [&_.ql-editor]:text-left [&_.ql-editor]:[direction:ltr]">
                    <ReactQuill theme="snow" value={formData.text_en} onChange={val => setFormData({...formData, text_en: val})} />
                  </div>
                </div>

                {/* Arabic Section */}
                <div className="bg-card p-6 rounded-xl border shadow-lg space-y-4" dir="rtl">
                  <h2 className="text-xl font-bold">المحتوى العربي</h2>
                  <Input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} placeholder="العنوان (AR)" />
                  <div className="bg-white text-black rounded-md overflow-hidden text-right [&_.ql-editor]:text-right [&_.ql-editor]:[direction:rtl] [&_.ql-editor_p]:text-right">
                    <ReactQuill theme="snow" value={formData.text_ar} onChange={val => setFormData({...formData, text_ar: val})} />
                  </div>
                </div>

                {/* Somali Section */}
                <div className="bg-card p-6 rounded-xl border shadow-lg space-y-4" dir="ltr">
                  <h2 className="text-xl font-bold">Soomaali Content</h2>
                  <Input value={formData.title_so} onChange={e => setFormData({...formData, title_so: e.target.value})} placeholder="Title (SO)" />
                  <div className="bg-white text-black rounded-md overflow-hidden [&_.ql-editor]:text-left [&_.ql-editor]:[direction:ltr]">
                    <ReactQuill theme="snow" value={formData.text_so} onChange={val => setFormData({...formData, text_so: val})} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Saving...' : (editingId ? 'Update Article' : 'Publish Article')}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                  )}
                </div>
              </form>
            </TabsContent>

            <TabsContent value="manage">
              <div className="space-y-4">
                {newsList.map((news) => (
                  <div key={news.id} className="p-4 border rounded-lg flex justify-between items-center bg-card">
                    <h3 className="font-bold">{news.title_en || 'Untitled'}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(news)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(news.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}