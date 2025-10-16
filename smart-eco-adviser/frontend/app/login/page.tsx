"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Leaf, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { authAPI } from "@/lib/api"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // toggle between login/signup
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    try {
      const data = isLogin 
        ? await authAPI.login(email, password)
        : await authAPI.signup(name, email, password);
      
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        toast({
          title: isLogin ? "Login Successful" : "Signup Successful",
          description: isLogin ? "Welcome back!" : "Welcome!"
        })
        router.push("/") // redirect to home
      }
    } catch (err: any) {
      toast({
        title: isLogin ? "Login Error" : "Signup Error",
        description: err.message || "Server error",
        variant: "destructive"
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-md relative shadow-xl border-green-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join Us"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to continue your eco journey" : "Start your sustainable lifestyle today"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="pl-10"
              />
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
            onClick={handleAuth} 
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </Button>

          <div className="text-center text-sm">
            {isLogin ? (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-green-600 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  className="text-green-600 font-semibold hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

//login/page.tsx