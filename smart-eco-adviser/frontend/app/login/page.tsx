"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token)
        toast({ title: "Login Successful", description: "Welcome back!" })
        router.push("/") // redirect to homepage or dashboard
      } else {
        toast({ title: "Login Failed", description: data.error || "Invalid credentials", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Login Error", description: "Server error", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-6">Login</h2>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="mb-4" />
        <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="mb-4" />
        <Button className="w-full" onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
      </div>
    </div>
  )
}