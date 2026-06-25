import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set in your .env.local file')
}

// This creates a serverless-friendly HTTP connection
export const sql = neon(process.env.DATABASE_URL)