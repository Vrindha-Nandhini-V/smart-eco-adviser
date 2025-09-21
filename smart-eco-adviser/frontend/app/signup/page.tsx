"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token)
        toast({ title: "Signup Successful", description: "Welcome!" })
        router.push("/") // redirect after signup
      } else {
        toast({ title: "Signup Failed", description: data.error || "Could not create account", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Signup Error", description: "Server error", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-6">Sign Up</h2>
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="mb-4" />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="mb-4" />
        <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="mb-4" />
        <Button className="w-full" onClick={handleSignup} disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</Button>
      </div>
    </div>
  )
}