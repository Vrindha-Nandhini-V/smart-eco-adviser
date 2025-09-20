import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calculator, Lightbulb, Trophy, MessageCircle, BarChart3, Leaf, TreePine, Recycle, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Smart <span className="text-primary">Eco Adviser</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8">
              Calculate your carbon footprint, get personalized eco-friendly recommendations, and join challenges to
              make a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="w-full sm:w-auto">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Footprint
                </Button>
              </Link>
              <Link href="/recommendations">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Get Eco Tips
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">2.5T</div>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">1.2K</div>
                <p className="text-sm text-muted-foreground">Users Active</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">850</div>
                <p className="text-sm text-muted-foreground">Challenges Done</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-balance mb-4">Everything You Need for Sustainable Living</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Our comprehensive platform helps you understand, track, and reduce your environmental impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  <CardTitle>Carbon Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate your personal carbon footprint with our detailed questionnaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculator">
                  <Button className="w-full">Start Calculating</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <CardTitle>Eco Recommendations</CardTitle>
                </div>
                <CardDescription>Get personalized tips and actionable advice for sustainable living</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/recommendations">
                  <Button className="w-full">View Tips</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <CardTitle>Eco Challenges</CardTitle>
                </div>
                <CardDescription>
                  Join daily, weekly, and monthly challenges to build sustainable habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/challenges">
                  <Button className="w-full">Join Challenges</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <CardTitle>AI Chat Assistant</CardTitle>
                </div>
                <CardDescription>Get instant answers to your sustainability questions from our AI bot</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/chatbot">
                  <Button className="w-full">Start Chatting</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <CardTitle>Analytics Dashboard</CardTitle>
                </div>
                <CardDescription>Track your progress and visualize your environmental impact over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analytics">
                  <Button className="w-full">View Analytics</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <CardTitle>Quick Assessment</CardTitle>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <CardDescription>
                  Take a 2-minute assessment to get started with personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
