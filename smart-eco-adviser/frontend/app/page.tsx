// pages/index.tsx (or app/page.tsx)
import AuthWrapper from "@/components/AuthWrapper"
import { Navigation } from "@/components/navigation"
import { DashboardWelcome } from "@/components/dashboard-welcome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calculator, Lightbulb, Trophy, MessageCircle, BarChart3, Leaf, TreePine, Recycle, Zap, Globe, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8 space-y-12">
          {/* Welcome Card */}
          <DashboardWelcome />

          {/* Impact Stats */}
          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">10,000+</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">500t</div>
                  <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">50,000+</div>
                  <p className="text-sm text-muted-foreground">Challenges Completed</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">85%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need for a Sustainable Lifestyle</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive tools and resources to help you reduce your environmental impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Calculator,
                  title: "Carbon Calculator",
                  description: "Accurately measure your carbon footprint across transportation, energy, diet, and waste",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Lightbulb,
                  title: "Smart Recommendations",
                  description: "Get personalized eco-friendly tips based on your location and lifestyle",
                  color: "from-amber-500 to-orange-500"
                },
                {
                  icon: Trophy,
                  title: "Eco Challenges",
                  description: "Join daily, weekly, and monthly challenges to build sustainable habits",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: MessageCircle,
                  title: "AI Chat Assistant",
                  description: "Ask questions and get instant answers about sustainable living",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  description: "Track your progress with detailed insights and visualizations",
                  color: "from-indigo-500 to-blue-500"
                },
                {
                  icon: TreePine,
                  title: "Community Impact",
                  description: "See how your actions contribute to global environmental goals",
                  color: "from-teal-500 to-cyan-500"
                }
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <Card key={idx} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12">
            <Card className="border-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <CardContent className="p-12 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of eco-warriors making a positive impact on our planet every day
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/calculator">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      <Calculator className="mr-2 h-5 w-5" />
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link href="/challenges">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                      <Trophy className="mr-2 h-5 w-5" />
                      View Challenges
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </AuthWrapper>
  )
}


//app/page.tsx