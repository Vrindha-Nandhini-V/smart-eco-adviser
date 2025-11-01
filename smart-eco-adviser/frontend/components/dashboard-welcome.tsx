"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { userAPI, challengeAPI } from "@/lib/api"
import { 
  Calculator, 
  Lightbulb, 
  Trophy, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Zap,
  Target
} from "lucide-react"

export function DashboardWelcome() {
  const [user, setUser] = useState<any>(null)
  const [greeting, setGreeting] = useState("")
  const [stats, setStats] = useState({
    level: 1,
    streak: 0,
    activeChallenges: 0,
    xp: 0,
    nextLevelXp: 1000
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Fetch real user stats
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [userStats, userChallenges] = await Promise.all([
        userAPI.getStats().catch(() => ({ level: 1, streak: 0, xp: 0, nextLevelXp: 1000 })),
        challengeAPI.getUserChallenges().catch(() => [])
      ])

      const activeChallenges = userChallenges.filter((c: any) => c.status === 'in_progress').length

      setStats({
        level: userStats.level || 1,
        streak: userStats.streak || 0,
        activeChallenges,
        xp: userStats.xp || 0,
        nextLevelXp: userStats.nextLevelXp || 1000
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="border-2">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const quickActions = [
    {
      title: "Calculate Footprint",
      description: "Track your carbon emissions",
      icon: Calculator,
      href: "/calculator",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Get Eco Tips",
      description: "Personalized recommendations",
      icon: Lightbulb,
      href: "/recommendations",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Join Challenge",
      description: "Start your eco journey",
      icon: Trophy,
      href: "/challenges",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-2 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full -ml-24 -mb-24"></div>
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {greeting}, {user?.name || 'Eco Warrior'}!
                </h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Ready to make a positive impact today?
              </p>
              
              {/* Stats Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm">
                  <Zap className="h-4 w-4 mr-1" />
                  Level {stats.level}
                </Badge>
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stats.streak} Day Streak
                </Badge>
                {stats.activeChallenges > 0 && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm">
                    <Target className="h-4 w-4 mr-1" />
                    {stats.activeChallenges} Active Challenges
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.title} href={action.href}>
              <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <div className="flex items-center text-green-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
