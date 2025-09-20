import { Navigation } from "@/components/navigation"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <AnalyticsDashboard />
      </main>
    </div>
  )
}
