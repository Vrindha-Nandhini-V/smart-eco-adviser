import { Navigation } from "@/components/navigation"
import { CarbonCalculator } from "@/components/carbon-calculator"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <CarbonCalculator />
      </main>
    </div>
  )
}
