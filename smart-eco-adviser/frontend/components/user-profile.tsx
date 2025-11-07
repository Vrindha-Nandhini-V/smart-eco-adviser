"use client"

import { useState, useEffect } from "react"
import { userAPI } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Target,
  TrendingUp,
  Zap,
  Save,
  Edit2,
  Camera,
  Trophy,
  Star,
  Leaf
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function UserProfile() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: ""
  })

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const userData = JSON.parse(userStr)
      setUser(userData)
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        location: userData.location || ""
      })
    }
    // Load real stats
    loadUserStats()
  }, [])

  const loadUserStats = async () => {
    try {
      const statsData = await userAPI.getStats()
      // Update stats with real data from API
    } catch (error) {
      console.error('Error loading user stats:', error)
    }
  }

  const handleSave = () => {
    // Update user data
    const updatedUser = { ...user, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Mock stats - replace with real data from API
  const stats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    totalChallenges: 24,
    completedChallenges: 18,
    co2Saved: 125.5,
    streak: 7,
    achievements: 8
  }

  const xpPercentage = (stats.xp / stats.nextLevelXp) * 100

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Avatar */}
      <Card className="border-2 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"></div>
        <CardContent className="relative pt-16 pb-8">
          {/* Avatar */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg"
                variant="default"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mt-4 space-y-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground flex items-center justify-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </p>
            {user.role === 'admin' && (
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Star className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>

          {/* Level & XP */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Level {stats.level}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stats.xp} / {stats.nextLevelXp} XP
              </span>
            </div>
            <Progress value={xpPercentage} className="h-3" />
            <p className="text-xs text-center text-muted-foreground mt-1">
              {stats.nextLevelXp - stats.xp} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{stats.completedChallenges}</p>
                <p className="text-sm text-muted-foreground text-center">Challenges</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">{stats.co2Saved}t</p>
                <p className="text-sm text-muted-foreground text-center">CO₂ Saved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold">{stats.streak}</p>
                <p className="text-sm text-muted-foreground text-center">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">{stats.achievements}</p>
                <p className="text-sm text-muted-foreground text-center">Achievements</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details & Achievements */}
        <div className="lg:col-span-2">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Details</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <div className="lg:col-span-1">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Achievements
              </CardTitle>
              <CardDescription>Your eco accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "First Steps", icon: Target, color: "bg-green-100 text-green-600", earned: true },
                { name: "Eco Warrior", icon: Trophy, color: "bg-blue-100 text-blue-600", earned: true },
                { name: "Streak Master", icon: Zap, color: "bg-yellow-100 text-yellow-600", earned: true },
                { name: "Planet Saver", icon: Leaf, color: "bg-emerald-100 text-emerald-600", earned: false },
              ].map((achievement, idx) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? "bg-green-50 border border-green-200" : "bg-muted/50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full ${achievement.color} flex items-center justify-center ${!achievement.earned && 'opacity-50'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${!achievement.earned && 'text-muted-foreground'}`}>
                        {achievement.name}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-600">
                        <Star className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
