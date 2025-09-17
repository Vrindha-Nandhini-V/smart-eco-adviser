"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Clock,
  Target,
  Star,
  CheckCircle,
  Play,
  Award,
  Users,
  TrendingUp,
  Car,
  Home,
  Utensils,
  Trash2,
  Zap,
  Leaf,
  TreePine,
} from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  category: "transportation" | "energy" | "diet" | "waste"
  type: "daily" | "weekly" | "monthly"
  difficulty: "easy" | "medium" | "hard"
  points: number
  co2Impact: number
  duration: string
  progress: number
  maxProgress: number
  status: "not_started" | "in_progress" | "completed"
  startDate?: string
  endDate?: string
  participants?: number
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Walk or Bike to Work",
    description: "Use active transportation for your daily commute instead of driving",
    category: "transportation",
    type: "daily",
    difficulty: "easy",
    points: 50,
    co2Impact: 2.5,
    duration: "Today",
    progress: 0,
    maxProgress: 1,
    status: "not_started",
    participants: 1247,
  },
  {
    id: "2",
    title: "Unplug Electronics",
    description: "Unplug all non-essential electronics when leaving home",
    category: "energy",
    type: "daily",
    difficulty: "easy",
    points: 30,
    co2Impact: 0.8,
    duration: "Today",
    progress: 1,
    maxProgress: 1,
    status: "completed",
    participants: 892,
  },
  {
    id: "3",
    title: "Meatless Week",
    description: "Go vegetarian for an entire week and discover new plant-based recipes",
    category: "diet",
    type: "weekly",
    difficulty: "medium",
    points: 200,
    co2Impact: 12.5,
    duration: "7 days",
    progress: 3,
    maxProgress: 7,
    status: "in_progress",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    participants: 456,
  },
  {
    id: "4",
    title: "Zero Waste Challenge",
    description: "Produce no landfill waste for an entire week",
    category: "waste",
    type: "weekly",
    difficulty: "hard",
    points: 300,
    co2Impact: 8.2,
    duration: "7 days",
    progress: 0,
    maxProgress: 7,
    status: "not_started",
    participants: 234,
  },
  {
    id: "5",
    title: "Energy Efficiency Month",
    description: "Reduce your home energy consumption by 20% this month",
    category: "energy",
    type: "monthly",
    difficulty: "medium",
    points: 500,
    co2Impact: 45.0,
    duration: "30 days",
    progress: 12,
    maxProgress: 30,
    status: "in_progress",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    participants: 789,
  },
  {
    id: "6",
    title: "Public Transport Champion",
    description: "Use only public transportation for all trips this month",
    category: "transportation",
    type: "monthly",
    difficulty: "hard",
    points: 600,
    co2Impact: 85.0,
    duration: "30 days",
    progress: 0,
    maxProgress: 30,
    status: "not_started",
    participants: 123,
  },
]

const categoryIcons = {
  transportation: Car,
  energy: Home,
  diet: Utensils,
  waste: Trash2,
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
}

const statusColors = {
  not_started: "bg-gray-100 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
}

const achievements = [
  { id: "1", title: "First Steps", description: "Complete your first challenge", icon: Target, earned: true },
  { id: "2", title: "Streak Master", description: "Complete 7 daily challenges in a row", icon: Zap, earned: true },
  { id: "3", title: "Eco Warrior", description: "Complete 10 challenges", icon: Award, earned: false },
  { id: "4", title: "Planet Saver", description: "Save 100kg of CO₂", icon: TreePine, earned: false },
  { id: "5", title: "Community Leader", description: "Join 5 group challenges", icon: Users, earned: false },
]

const leaderboard = [
  { rank: 1, name: "Alex Chen", points: 2450, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 2, name: "Sarah Johnson", points: 2380, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 3, name: "Mike Rodriguez", points: 2210, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 4, name: "You", points: 1890, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 5, name: "Emma Wilson", points: 1750, avatar: "/placeholder.svg?height=32&width=32" },
]

export function EcoChallenges() {
  const [selectedTab, setSelectedTab] = useState("active")
  const [challengesList, setChallengesList] = useState(challenges)

  const startChallenge = (id: string) => {
    setChallengesList((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? {
              ...challenge,
              status: "in_progress" as const,
              startDate: new Date().toISOString().split("T")[0],
            }
          : challenge,
      ),
    )
  }

  const updateProgress = (id: string) => {
    setChallengesList((prev) =>
      prev.map((challenge) => {
        if (challenge.id === id && challenge.status === "in_progress") {
          const newProgress = Math.min(challenge.progress + 1, challenge.maxProgress)
          return {
            ...challenge,
            progress: newProgress,
            status: newProgress === challenge.maxProgress ? ("completed" as const) : challenge.status,
          }
        }
        return challenge
      }),
    )
  }

  const activeChallenges = challengesList.filter((c) => c.status === "in_progress")
  const completedChallenges = challengesList.filter((c) => c.status === "completed")
  const availableChallenges = challengesList.filter((c) => c.status === "not_started")

  const totalPoints = completedChallenges.reduce((sum, challenge) => sum + challenge.points, 0)
  const totalCO2Saved = completedChallenges.reduce((sum, challenge) => sum + challenge.co2Impact, 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Eco Challenges</h1>
        <p className="text-muted-foreground mb-6">
          Join daily, weekly, and monthly challenges to build sustainable habits
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalCO2Saved.toFixed(1)}kg</div>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completedChallenges.length}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{activeChallenges.length}</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableChallenges.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active challenges. Start a new challenge to begin your eco journey!</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onStart={() => startChallenge(challenge.id)}
                  onProgress={() => updateProgress(challenge.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onStart={() => startChallenge(challenge.id)}
                onProgress={() => updateProgress(challenge.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No completed challenges yet. Complete your first challenge to see it here!</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onStart={() => startChallenge(challenge.id)}
                  onProgress={() => updateProgress(challenge.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Monthly Leaderboard
                </CardTitle>
                <CardDescription>Top eco champions this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.name === "You" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {user.rank}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className={`font-medium ${user.name === "You" ? "text-primary" : ""}`}>{user.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{user.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
                <CardDescription>Your eco accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          achievement.earned ? "bg-green-50 border border-green-200" : "bg-muted/50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            achievement.earned ? "bg-green-100" : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${achievement.earned ? "text-green-600" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.earned ? "text-green-800" : ""}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChallengeCard({
  challenge,
  onStart,
  onProgress,
}: {
  challenge: Challenge
  onStart: () => void
  onProgress: () => void
}) {
  const CategoryIcon = categoryIcons[challenge.category]
  const progressPercentage = (challenge.progress / challenge.maxProgress) * 100

  return (
    <Card className={challenge.status === "completed" ? "bg-green-50 border-green-200" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CategoryIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <CardDescription className="mt-1">{challenge.description}</CardDescription>
            </div>
          </div>
          <Badge className={statusColors[challenge.status]}>{challenge.status.replace("_", " ")}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="capitalize">
            {challenge.type}
          </Badge>
          <Badge className={difficultyColors[challenge.difficulty]}>{challenge.difficulty}</Badge>
          <Badge variant="outline" className="text-primary">
            <Star className="h-3 w-3 mr-1" />
            {challenge.points} pts
          </Badge>
          <Badge variant="outline" className="text-green-600">
            <Leaf className="h-3 w-3 mr-1" />
            {challenge.co2Impact}kg CO₂
          </Badge>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {challenge.duration}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {challenge.status !== "not_started" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>
                {challenge.progress} / {challenge.maxProgress}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {challenge.participants} participants
          </div>

          {challenge.status === "not_started" && (
            <Button onClick={onStart}>
              <Play className="h-4 w-4 mr-2" />
              Start Challenge
            </Button>
          )}

          {challenge.status === "in_progress" && (
            <Button onClick={onProgress} variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Update Progress
            </Button>
          )}

          {challenge.status === "completed" && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="font-medium">Completed!</span>
            </div>
          )}
        </div>

        {challenge.status === "completed" && (
          <div className="bg-green-100 p-3 rounded-lg">
            <div className="flex items-center justify-between text-green-800">
              <span className="text-sm font-medium">Challenge completed!</span>
              <div className="flex items-center space-x-4 text-sm">
                <span>+{challenge.points} points</span>
                <span>-{challenge.co2Impact}kg CO₂</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
