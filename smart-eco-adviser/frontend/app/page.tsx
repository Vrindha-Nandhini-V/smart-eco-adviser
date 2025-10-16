// pages/index.tsx (or app/page.tsx)
import AuthWrapper from "@/components/AuthWrapper"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calculator, Lightbulb, Trophy, MessageCircle, BarChart3, Leaf, TreePine, Recycle, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <AuthWrapper>
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
                Your Smart <span className="text-primary">Eco Adviser</span>
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

          {/* Rest of your home page sections (Stats, Features, etc.) */}
        </main>
      </div>
    </AuthWrapper>
  )
}


//app/page.tsx