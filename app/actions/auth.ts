'use server'

import { sql } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function loginAdmin(username: string, passwordPlain: string) {
  // neon returns the rows directly
  const rows = await sql`SELECT * FROM admin_user WHERE username = ${username}`
  
  if (rows.length === 0) return { success: false, error: 'User not found' }

  const user = rows[0]
  const isValid = await bcrypt.compare(passwordPlain, user.password_hash)

  if (isValid) {
    const cookieStore = await cookies()

cookieStore.set('admin_session', 'authenticated', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24,
})
    return { success: true }
  }

  return { success: false, error: 'Invalid password' }
}