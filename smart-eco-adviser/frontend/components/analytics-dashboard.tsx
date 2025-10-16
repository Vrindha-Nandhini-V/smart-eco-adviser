"use client"

import { useState, useEffect } from "react"
import { carbonAPI } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { 
  TrendingDown, 
  TrendingUp,
  Target, 
  Award, 
  Calendar, 
  Leaf, 
  TreePine, 
  Recycle, 
  Zap,
  Car,
  Home,
  Utensils,
  Trash2,
  Sparkles,
  Globe,
  Wind,
  Droplets
} from "lucide-react"

const COLORS = {
  transportation: "#3b82f6", // blue
  energy: "#f59e0b", // amber
  diet: "#10b981", // emerald
  waste: "#8b5cf6", // violet
  primary: "#16a34a", // green
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444"
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const data = await carbonAPI.getAnalytics()
      setAnalyticsData(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load analytics",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
            <Leaf className="h-8 w-8 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium">Loading your eco journey...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData || !analyticsData.monthlyData || analyticsData.monthlyData.length === 0) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <TreePine className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Start Your Eco Journey!</h3>
          <p className="text-muted-foreground mb-4">Calculate your carbon footprint to see your analytics</p>
          <a href="/calculator" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
            <Leaf className="h-5 w-5 mr-2" />
            Calculate Now
          </a>
        </div>
      </div>
    )
  }

  const currentFootprint = (analyticsData.currentFootprint / 1000) || 0
  const targetFootprint = 2.0 // Paris Agreement target: 2 tons per person
  const nationalAverage = 1.9 // India's per capita CO2 emissions
  const globalAverage = 4.5 // Global average
  
  const reductionPercentage = currentFootprint > 0 && targetFootprint > 0 
    ? ((currentFootprint - targetFootprint) / currentFootprint) * 100 
    : 0
  
  const vsNationalAvg = currentFootprint > 0 && nationalAverage > 0
    ? ((nationalAverage - currentFootprint) / nationalAverage) * 100
    : 0

  const monthlyData = analyticsData.monthlyData.map((item: any) => ({
    month: item.month,
    footprint: (item.footprint / 1000).toFixed(2),
    transportation: (item.transportation / 1000).toFixed(2),
    energy: (item.energy / 1000).toFixed(2),
    diet: (item.diet / 1000).toFixed(2),
    waste: (item.waste / 1000).toFixed(2),
    target: targetFootprint
  }))

  const categoryData = [
    { 
      name: "Transportation", 
      value: parseFloat(monthlyData[monthlyData.length - 1]?.transportation || 0),
      color: COLORS.transportation,
      icon: Car
    },
    { 
      name: "Energy", 
      value: parseFloat(monthlyData[monthlyData.length - 1]?.energy || 0),
      color: COLORS.energy,
      icon: Home
    },
    { 
      name: "Diet", 
      value: parseFloat(monthlyData[monthlyData.length - 1]?.diet || 0),
      color: COLORS.diet,
      icon: Utensils
    },
    { 
      name: "Waste", 
      value: parseFloat(monthlyData[monthlyData.length - 1]?.waste || 0),
      color: COLORS.waste,
      icon: Trash2
    },
  ]

  const totalCategoryValue = categoryData.reduce((sum, cat) => sum + cat.value, 0)

  const ecoActions = analyticsData.ecoActions || 0
  const completedChallenges = analyticsData.completedChallenges || 0

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Eco-themed Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 animate-pulse" />
              <h1 className="text-3xl font-bold">Your Eco Analytics</h1>
            </div>
            <p className="text-green-50 text-lg">Track your journey to a sustainable future</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Enhanced Key Metrics with Icons and Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center">
                  <Leaf className="h-4 w-4 mr-1" />
                  Current Footprint
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {currentFootprint.toFixed(2)}t
                </p>
                <p className="text-xs text-muted-foreground">CO₂ per year</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <Progress value={Math.min((currentFootprint / targetFootprint) * 100, 100)} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  vs Target
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {currentFootprint < targetFootprint ? (
                    <span className="flex items-center text-green-600">
                      <TrendingDown className="h-6 w-6 mr-1" />
                      {Math.abs(reductionPercentage).toFixed(1)}%
                    </span>
                  ) : (
                    <span className="flex items-center text-orange-600">
                      <TrendingUp className="h-6 w-6 mr-1" />
                      {Math.abs(reductionPercentage).toFixed(1)}%
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">Target: {targetFootprint}t/year</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  vs India Avg
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {vsNationalAvg > 0 ? (
                    <span className="text-green-600">{vsNationalAvg.toFixed(1)}% ↓</span>
                  ) : (
                    <span className="text-orange-600">{Math.abs(vsNationalAvg).toFixed(1)}% ↑</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">National: {nationalAverage}t/year</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
                <Wind className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Eco Actions
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {ecoActions}
                </p>
                <p className="text-xs text-muted-foreground">{completedChallenges} challenges done</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-red-100">
                <Recycle className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 h-auto p-1 bg-gradient-to-r from-green-50 to-emerald-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
            <TreePine className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
            <TrendingDown className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
            <Target className="h-4 w-4 mr-2" />
            Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Carbon Footprint Trend */}
            <Card className="shadow-lg border-2">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Carbon Footprint Trend
                </CardTitle>
                <CardDescription>Your monthly emissions vs Paris Agreement target</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    footprint: {
                      label: "Your Footprint",
                      color: COLORS.primary,
                    },
                    target: {
                      label: "Target (2t)",
                      color: COLORS.warning,
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorFootprint" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="footprint" 
                        stroke={COLORS.primary} 
                        strokeWidth={3}
                        fill="url(#colorFootprint)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown Pie Chart */}
            <Card className="shadow-lg border-2">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Emissions by Category
                </CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    value: {
                      label: "CO₂ (tons)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryData.map((category) => {
              const Icon = category.icon
              const percentage = totalCategoryValue > 0 ? (category.value / totalCategoryValue) * 100 : 0
              return (
                <Card key={category.name} className="hover:shadow-lg transition-all border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${category.color}20` }}>
                        <Icon className="h-6 w-6" style={{ color: category.color }} />
                      </div>
                      <Badge style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-2xl font-bold mb-2" style={{ color: category.color }}>
                      {category.value.toFixed(2)}t
                    </p>
                    <Progress value={percentage} className="h-2" style={{ backgroundColor: `${category.color}20` }} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-purple-600" />
                Category Trends Over Time
              </CardTitle>
              <CardDescription>Track your progress across all categories</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  transportation: { label: "Transportation", color: COLORS.transportation },
                  energy: { label: "Energy", color: COLORS.energy },
                  diet: { label: "Diet", color: COLORS.diet },
                  waste: { label: "Waste", color: COLORS.waste },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="transportation" stroke={COLORS.transportation} strokeWidth={2} />
                    <Line type="monotone" dataKey="energy" stroke={COLORS.energy} strokeWidth={2} />
                    <Line type="monotone" dataKey="diet" stroke={COLORS.diet} strokeWidth={2} />
                    <Line type="monotone" dataKey="waste" stroke={COLORS.waste} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-orange-600" />
                Monthly Comparison
              </CardTitle>
              <CardDescription>Compare emissions across months</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  transportation: { label: "Transportation", color: COLORS.transportation },
                  energy: { label: "Energy", color: COLORS.energy },
                  diet: { label: "Diet", color: COLORS.diet },
                  waste: { label: "Waste", color: COLORS.waste },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="transportation" stackId="a" fill={COLORS.transportation} />
                    <Bar dataKey="energy" stackId="a" fill={COLORS.energy} />
                    <Bar dataKey="diet" stackId="a" fill={COLORS.diet} />
                    <Bar dataKey="waste" stackId="a" fill={COLORS.waste} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Eco Tips Banner */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Keep up the great work!</h3>
                <p className="text-green-50">You're making a positive impact on the environment</p>
              </div>
            </div>
            <a 
              href="/recommendations" 
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg"
            >
              Get More Tips
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
