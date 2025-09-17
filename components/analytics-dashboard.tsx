"use client"

import { useState } from "react"
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
import { TrendingDown, Target, Award, Calendar, Leaf, TreePine, Recycle, Zap } from "lucide-react"

// Mock data for demonstration
const monthlyData = [
  { month: "Jan", footprint: 15.2, target: 14.0, transportation: 6.2, energy: 4.8, diet: 2.7, waste: 1.5 },
  { month: "Feb", footprint: 14.8, target: 14.0, transportation: 5.9, energy: 4.6, diet: 2.8, waste: 1.5 },
  { month: "Mar", footprint: 14.1, target: 14.0, transportation: 5.5, energy: 4.4, diet: 2.7, waste: 1.5 },
  { month: "Apr", footprint: 13.7, target: 14.0, transportation: 5.2, energy: 4.2, diet: 2.8, waste: 1.5 },
  { month: "May", footprint: 13.2, target: 14.0, transportation: 4.9, energy: 4.0, diet: 2.8, waste: 1.5 },
  { month: "Jun", footprint: 12.8, target: 14.0, transportation: 4.6, energy: 3.8, diet: 2.9, waste: 1.5 },
]

const weeklyData = [
  { week: "Week 1", footprint: 3.2, actions: 8 },
  { week: "Week 2", footprint: 3.0, actions: 12 },
  { week: "Week 3", footprint: 2.9, actions: 15 },
  { week: "Week 4", footprint: 2.7, actions: 18 },
]

const categoryData = [
  { name: "Transportation", value: 4.6, color: "hsl(var(--chart-1))" },
  { name: "Energy", value: 3.8, color: "hsl(var(--chart-2))" },
  { name: "Diet", value: 2.9, color: "hsl(var(--chart-3))" },
  { name: "Waste", value: 1.5, color: "hsl(var(--chart-4))" },
]

const achievements = [
  {
    title: "First Calculation",
    description: "Completed your first carbon footprint assessment",
    date: "2024-01-15",
    icon: Target,
  },
  { title: "Eco Warrior", description: "Reduced footprint by 15% in 3 months", date: "2024-03-20", icon: Award },
  { title: "Green Commuter", description: "Used public transport for 30 days", date: "2024-04-10", icon: TreePine },
  { title: "Energy Saver", description: "Reduced energy consumption by 20%", date: "2024-05-05", icon: Zap },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedTab, setSelectedTab] = useState("overview")

  const currentFootprint = 12.8
  const targetFootprint = 14.0
  const reductionPercentage = ((targetFootprint - currentFootprint) / targetFootprint) * 100
  const nationalAverage = 16.0

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your environmental impact and progress over time</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Footprint</p>
                <p className="text-2xl font-bold">{currentFootprint}t</p>
                <p className="text-xs text-muted-foreground">CO₂ per year</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reduction</p>
                <p className="text-2xl font-bold text-green-600">{reductionPercentage.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">vs target</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">vs National Avg</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(((nationalAverage - currentFootprint) / nationalAverage) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">below average</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eco Actions</p>
                <p className="text-2xl font-bold">53</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Recycle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Carbon Footprint Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint Trend</CardTitle>
                <CardDescription>Your monthly carbon footprint vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    footprint: {
                      label: "Actual Footprint",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="footprint" stroke="var(--color-footprint)" strokeWidth={3} />
                      <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Current Breakdown</CardTitle>
                <CardDescription>Carbon footprint by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    transportation: { label: "Transportation", color: "hsl(var(--chart-1))" },
                    energy: { label: "Energy", color: "hsl(var(--chart-2))" },
                    diet: { label: "Diet", color: "hsl(var(--chart-3))" },
                    waste: { label: "Waste", color: "hsl(var(--chart-4))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Progress Towards Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Towards Goals</CardTitle>
              <CardDescription>Track your environmental goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Annual Carbon Reduction Goal</span>
                  <span>{reductionPercentage.toFixed(1)}% / 15%</span>
                </div>
                <Progress value={(reductionPercentage / 15) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Eco Actions</span>
                  <span>53 / 60</span>
                </div>
                <Progress value={(53 / 60) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Renewable Energy Usage</span>
                  <span>75% / 100%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Carbon footprint and eco actions by week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    footprint: { label: "Footprint (tons)", color: "hsl(var(--chart-1))" },
                    actions: { label: "Eco Actions", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar yAxisId="left" dataKey="footprint" fill="var(--color-footprint)" />
                      <Bar yAxisId="right" dataKey="actions" fill="var(--color-actions)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Category Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Category Trends</CardTitle>
                <CardDescription>How each category has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    transportation: { label: "Transportation", color: "hsl(var(--chart-1))" },
                    energy: { label: "Energy", color: "hsl(var(--chart-2))" },
                    diet: { label: "Diet", color: "hsl(var(--chart-3))" },
                    waste: { label: "Waste", color: "hsl(var(--chart-4))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="transportation"
                        stackId="1"
                        stroke="var(--color-transportation)"
                        fill="var(--color-transportation)"
                      />
                      <Area
                        type="monotone"
                        dataKey="energy"
                        stackId="1"
                        stroke="var(--color-energy)"
                        fill="var(--color-energy)"
                      />
                      <Area
                        type="monotone"
                        dataKey="diet"
                        stackId="1"
                        stroke="var(--color-diet)"
                        fill="var(--color-diet)"
                      />
                      <Area
                        type="monotone"
                        dataKey="waste"
                        stackId="1"
                        stroke="var(--color-waste)"
                        fill="var(--color-waste)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryData.map((category) => (
              <Card key={category.name}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">{category.value}t</div>
                    <div className="text-sm text-muted-foreground mb-4">{category.name}</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(category.value / currentFootprint) * 100}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {((category.value / currentFootprint) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>Monthly carbon footprint by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  transportation: { label: "Transportation", color: "hsl(var(--chart-1))" },
                  energy: { label: "Energy", color: "hsl(var(--chart-2))" },
                  diet: { label: "Diet", color: "hsl(var(--chart-3))" },
                  waste: { label: "Waste", color: "hsl(var(--chart-4))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="transportation" stackId="a" fill="var(--color-transportation)" />
                    <Bar dataKey="energy" stackId="a" fill="var(--color-energy)" />
                    <Bar dataKey="diet" stackId="a" fill="var(--color-diet)" />
                    <Bar dataKey="waste" stackId="a" fill="var(--color-waste)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {achievement.date}
                        </div>
                      </div>
                      <Badge variant="secondary">Earned</Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next Achievements</CardTitle>
              <CardDescription>Goals you're working towards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <TreePine className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Carbon Neutral</h4>
                    <p className="text-sm text-muted-foreground">Reduce footprint to 8 tons/year</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">60% complete</div>
                  <Progress value={60} className="w-20 h-2 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Energy Master</h4>
                    <p className="text-sm text-muted-foreground">Use 100% renewable energy</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">75% complete</div>
                  <Progress value={75} className="w-20 h-2 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
