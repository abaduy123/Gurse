'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await loginAdmin(username, password)
    if (res.success) {
      router.push('/admin/news')
    } else {
      setError(res.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md border border-border">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Login</Button>
        </form>
      </div>
    </div>
  )
}