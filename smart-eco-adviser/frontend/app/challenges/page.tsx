import { Navigation } from "@/components/navigation"
import { EcoChallenges } from "@/components/eco-challenges"
import AuthWrapper from "@/components/AuthWrapper"

export default function ChallengesPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <EcoChallenges />
        </main>
      </div>
    </AuthWrapper>
  )
}
