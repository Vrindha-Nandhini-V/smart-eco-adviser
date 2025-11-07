import { Navigation } from "@/components/navigation"
import { EcoRecommendations } from "@/components/eco-recommendations"
import AuthWrapper from "@/components/AuthWrapper"

export default function RecommendationsPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <EcoRecommendations />
        </main>
      </div>
    </AuthWrapper>
  )
}
