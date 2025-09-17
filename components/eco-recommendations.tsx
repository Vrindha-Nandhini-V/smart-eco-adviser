"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Car,
  Home,
  Utensils,
  Trash2,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  TrendingDown,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
} from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  category: "transportation" | "energy" | "diet" | "waste"
  difficulty: "easy" | "medium" | "hard"
  impact: "low" | "medium" | "high"
  co2Reduction: number
  costSaving?: number
  timeToImplement: string
  steps: string[]
  tips: string[]
  saved: boolean
  completed: boolean
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Switch to LED Light Bulbs",
    description: "Replace incandescent bulbs with energy-efficient LED bulbs throughout your home",
    category: "energy",
    difficulty: "easy",
    impact: "medium",
    co2Reduction: 0.5,
    costSaving: 75,
    timeToImplement: "1-2 hours",
    steps: [
      "Audit all light fixtures in your home",
      "Purchase LED bulbs with appropriate wattage",
      "Replace bulbs one room at a time",
      "Dispose of old bulbs properly at recycling center",
    ],
    tips: [
      "Look for ENERGY STAR certified LED bulbs",
      "Choose warm white (2700K) for living areas",
      "Consider smart LED bulbs for additional energy savings",
    ],
    saved: false,
    completed: false,
  },
  {
    id: "2",
    title: "Use Public Transportation",
    description: "Replace car trips with public transit, walking, or cycling for daily commutes",
    category: "transportation",
    difficulty: "medium",
    impact: "high",
    co2Reduction: 2.3,
    costSaving: 200,
    timeToImplement: "1 week to adjust",
    steps: [
      "Research public transit routes in your area",
      "Download transit apps for real-time schedules",
      "Plan your routes and timing",
      "Start with 2-3 days per week and gradually increase",
    ],
    tips: [
      "Combine with walking or cycling for health benefits",
      "Use travel time for reading or catching up on podcasts",
      "Consider monthly passes for cost savings",
    ],
    saved: true,
    completed: false,
  },
  {
    id: "3",
    title: "Reduce Meat Consumption",
    description: "Adopt 'Meatless Monday' or reduce meat consumption by 2-3 meals per week",
    category: "diet",
    difficulty: "medium",
    impact: "high",
    co2Reduction: 1.8,
    timeToImplement: "2-3 weeks to adjust",
    steps: [
      "Start with one meatless day per week",
      "Explore plant-based protein alternatives",
      "Find vegetarian recipes you enjoy",
      "Gradually increase meatless meals",
    ],
    tips: [
      "Try legumes, tofu, and quinoa as protein sources",
      "Experiment with international vegetarian cuisines",
      "Focus on whole foods rather than processed meat substitutes",
    ],
    saved: false,
    completed: true,
  },
  {
    id: "4",
    title: "Start Composting",
    description: "Compost organic waste to reduce landfill contributions and create nutrient-rich soil",
    category: "waste",
    difficulty: "medium",
    impact: "medium",
    co2Reduction: 0.8,
    timeToImplement: "1-2 weeks setup",
    steps: [
      "Choose composting method (bin, tumbler, or pile)",
      "Set up composting area in yard or get indoor composter",
      "Learn what can and cannot be composted",
      "Start collecting organic waste separately",
    ],
    tips: [
      "Balance 'greens' (nitrogen) and 'browns' (carbon)",
      "Turn compost regularly for faster decomposition",
      "Use finished compost in your garden",
    ],
    saved: true,
    completed: false,
  },
  {
    id: "5",
    title: "Unplug Electronics When Not in Use",
    description: "Eliminate phantom power draw by unplugging devices and using power strips",
    category: "energy",
    difficulty: "easy",
    impact: "low",
    co2Reduction: 0.3,
    costSaving: 50,
    timeToImplement: "30 minutes",
    steps: [
      "Identify devices that draw power when off",
      "Use smart power strips for easy control",
      "Unplug chargers when not in use",
      "Make it a daily habit",
    ],
    tips: [
      "Focus on entertainment systems and kitchen appliances",
      "Use timers for devices you forget to unplug",
      "Consider smart plugs for remote control",
    ],
    saved: false,
    completed: false,
  },
  {
    id: "6",
    title: "Carpool or Rideshare",
    description: "Share rides with colleagues, friends, or use rideshare services to reduce individual car use",
    category: "transportation",
    difficulty: "easy",
    impact: "medium",
    co2Reduction: 1.2,
    costSaving: 150,
    timeToImplement: "1 week to organize",
    steps: [
      "Find colleagues or neighbors with similar commutes",
      "Set up a carpool schedule",
      "Use rideshare apps for occasional trips",
      "Coordinate pickup times and locations",
    ],
    tips: [
      "Split gas and parking costs fairly",
      "Have backup transportation plans",
      "Consider carpooling for events and shopping trips",
    ],
    saved: false,
    completed: false,
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

const impactColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-purple-100 text-purple-800",
}

export function EcoRecommendations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")
  const [recommendationsList, setRecommendationsList] = useState(recommendations)

  const toggleSaved = (id: string) => {
    setRecommendationsList((prev) => prev.map((rec) => (rec.id === id ? { ...rec, saved: !rec.saved } : rec)))
  }

  const toggleCompleted = (id: string) => {
    setRecommendationsList((prev) => prev.map((rec) => (rec.id === id ? { ...rec, completed: !rec.completed } : rec)))
  }

  const filteredRecommendations = recommendationsList.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || rec.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || rec.difficulty === selectedDifficulty

    if (selectedTab === "saved") return matchesSearch && matchesCategory && matchesDifficulty && rec.saved
    if (selectedTab === "completed") return matchesSearch && matchesCategory && matchesDifficulty && rec.completed
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const totalCO2Reduction = recommendationsList
    .filter((rec) => rec.completed)
    .reduce((sum, rec) => sum + rec.co2Reduction, 0)

  const totalCostSaving = recommendationsList
    .filter((rec) => rec.completed && rec.costSaving)
    .reduce((sum, rec) => sum + (rec.costSaving || 0), 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Eco Recommendations</h1>
        <p className="text-muted-foreground mb-6">Personalized tips and actionable advice for sustainable living</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalCO2Reduction.toFixed(1)}t</div>
                <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">${totalCostSaving}</div>
                <p className="text-sm text-muted-foreground">Money Saved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {recommendationsList.filter((rec) => rec.completed).length}
                </div>
                <p className="text-sm text-muted-foreground">Actions Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recommendations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            <SelectItem value="diet">Diet</SelectItem>
            <SelectItem value="waste">Waste</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          <TabsTrigger value="saved">Saved ({recommendationsList.filter((rec) => rec.saved).length})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({recommendationsList.filter((rec) => rec.completed).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredRecommendations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recommendations found matching your criteria.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRecommendations.map((recommendation) => {
                const CategoryIcon = categoryIcons[recommendation.category]
                return (
                  <Card
                    key={recommendation.id}
                    className={`${recommendation.completed ? "bg-green-50 border-green-200" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                            <CardDescription className="mt-1">{recommendation.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => toggleSaved(recommendation.id)}>
                            {recommendation.saved ? (
                              <BookmarkCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={recommendation.completed}
                              onCheckedChange={() => toggleCompleted(recommendation.id)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge className={difficultyColors[recommendation.difficulty]}>
                          {recommendation.difficulty}
                        </Badge>
                        <Badge className={impactColors[recommendation.impact]}>{recommendation.impact} impact</Badge>
                        <Badge variant="outline" className="text-green-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {recommendation.co2Reduction}t CO₂
                        </Badge>
                        {recommendation.costSaving && (
                          <Badge variant="outline" className="text-blue-600">
                            <DollarSign className="h-3 w-3 mr-1" />${recommendation.costSaving}/year
                          </Badge>
                        )}
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {recommendation.timeToImplement}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Steps to Implement
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {recommendation.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          Pro Tips
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {recommendation.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {recommendation.completed && (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <div className="flex items-center text-green-800">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">
                              Completed! Great job on reducing your carbon footprint.
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Progress Summary */}
      {recommendationsList.some((rec) => rec.completed) && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Environmental impact of your completed actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Completed Actions by Category</h4>
                <div className="space-y-3">
                  {Object.entries(categoryIcons).map(([category, Icon]) => {
                    const completed = recommendationsList.filter(
                      (rec) => rec.category === category && rec.completed,
                    ).length
                    const total = recommendationsList.filter((rec) => rec.category === category).length
                    const percentage = total > 0 ? (completed / total) * 100 : 0

                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span className="capitalize text-sm">{category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={percentage} className="w-20 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {completed}/{total}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Environmental Impact</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total CO₂ Reduction</span>
                    <span className="font-semibold text-green-600">{totalCO2Reduction.toFixed(1)} tons/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annual Cost Savings</span>
                    <span className="font-semibold text-blue-600">${totalCostSaving}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Actions Completed</span>
                    <span className="font-semibold">
                      {recommendationsList.filter((rec) => rec.completed).length} of {recommendationsList.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
