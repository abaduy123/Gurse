'use server'

import { sql } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function addNewsTransaction(formData: any) {
  try {
    // We use a WITH clause (CTE) to insert the news, grab its new ID, 
    // and immediately use that ID to insert the localized titles—all in one query!
    await sql`
      WITH inserted_news AS (
        INSERT INTO news (text_so, text_en, text_ar) 
        VALUES (${formData.text_so}, ${formData.text_en}, ${formData.text_ar}) 
        RETURNING id
      )
      INSERT INTO news_title (news_id, text_so, text_en, text_ar) 
      SELECT id, ${formData.title_so}, ${formData.title_en}, ${formData.title_ar} 
      FROM inserted_news;
    `
    
    // Refresh the home page to show the new data
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Database Error:', error)
    return { success: false, error: 'Failed to publish news article.' }
  }
}
export async function updateNews(id: number, formData: any) {
  try {
    // Update main text
    await sql`
      UPDATE news 
      SET text_so = ${formData.text_so}, text_en = ${formData.text_en}, text_ar = ${formData.text_ar} 
      WHERE id = ${id}
    `;
    // Update titles
    await sql`
      UPDATE news_title 
      SET text_so = ${formData.title_so}, text_en = ${formData.title_en}, text_ar = ${formData.title_ar} 
      WHERE news_id = ${id}
    `;
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Database Error:', error)
    return { success: false, error: 'Failed to update article.' }
  }
}
export async function deleteNews(id: number) {
  try {
    // We delete from both tables (or use ON DELETE CASCADE in your DB)
    await sql`DELETE FROM news_title WHERE news_id = ${id}`
    await sql`DELETE FROM news WHERE id = ${id}`
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Database Error:', error)
    return { success: false, error: 'Failed to delete article.' }
  }
}
export async function getNewsById(id: string) {
  const rows = await sql`
    SELECT 
      n.id, n.text_so, n.text_en, n.text_ar, n.created_at,
      t.text_so AS title_so, t.text_en AS title_en, t.text_ar AS title_ar
    FROM news n
    JOIN news_title t ON n.id = t.news_id
    WHERE n.id = ${id}
  `
  return rows[0] // Return the single object
}
export async function getNews() {
  // The neon client returns the rows array directly, unlike pg which returned { rows: [...] }
  const rows = await sql`
    SELECT 
      n.id, n.text_so, n.text_en, n.text_ar, n.created_at,
      t.text_so AS title_so, t.text_en AS title_en, t.text_ar AS title_ar
    FROM news n
    JOIN news_title t ON n.id = t.news_id
    ORDER BY n.created_at DESC
  `
  return rows
}