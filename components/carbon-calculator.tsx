"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Car, Home, Utensils, Trash2, ChevronLeft, ChevronRight, Calculator } from "lucide-react"

interface CalculatorData {
  // Transportation
  carMiles: number
  carType: string
  publicTransport: number
  flights: number

  // Energy
  electricityBill: number
  gasUsage: number
  homeSize: string
  renewableEnergy: string

  // Diet
  dietType: string
  localFood: string
  foodWaste: string

  // Waste
  recycling: string
  wasteReduction: string
  packaging: string
}

const initialData: CalculatorData = {
  carMiles: 0,
  carType: "",
  publicTransport: 0,
  flights: 0,
  electricityBill: 0,
  gasUsage: 0,
  homeSize: "",
  renewableEnergy: "",
  dietType: "",
  localFood: "",
  foodWaste: "",
  recycling: "",
  wasteReduction: "",
  packaging: "",
}

const steps = [
  { id: 1, title: "Transportation", icon: Car, description: "How do you get around?" },
  { id: 2, title: "Energy Use", icon: Home, description: "Your home energy consumption" },
  { id: 3, title: "Diet & Food", icon: Utensils, description: "Your eating habits" },
  { id: 4, title: "Waste & Recycling", icon: Trash2, description: "How you handle waste" },
  { id: 5, title: "Results", icon: Calculator, description: "Your carbon footprint" },
]

export function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<CalculatorData>(initialData)
  const [results, setResults] = useState<{ total: number; breakdown: any } | null>(null)

  const updateData = (field: keyof CalculatorData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    // Carbon footprint calculation logic (simplified)
    const transportationCO2 =
      data.carMiles * getCarEmissionFactor(data.carType) + data.publicTransport * 0.1 + data.flights * 0.5

    const energyCO2 =
      data.electricityBill * 0.92 +
      data.gasUsage * 5.3 +
      getHomeSizeMultiplier(data.homeSize) -
      getRenewableDiscount(data.renewableEnergy)

    const dietCO2 =
      getDietEmissions(data.dietType) + getLocalFoodDiscount(data.localFood) + getFoodWasteImpact(data.foodWaste)

    const wasteCO2 = getWasteEmissions(data.recycling, data.wasteReduction, data.packaging)

    const total = transportationCO2 + energyCO2 + dietCO2 + wasteCO2

    setResults({
      total: Math.round(total * 100) / 100,
      breakdown: {
        transportation: Math.round(transportationCO2 * 100) / 100,
        energy: Math.round(energyCO2 * 100) / 100,
        diet: Math.round(dietCO2 * 100) / 100,
        waste: Math.round(wasteCO2 * 100) / 100,
      },
    })
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 4) {
        calculateFootprint()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Carbon Footprint Calculator</h2>
          <Badge variant="outline">
            {currentStep} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          {steps.map((step) => (
            <div key={step.id} className={`flex items-center ${currentStep >= step.id ? "text-primary" : ""}`}>
              <step.icon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 mr-2" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && <TransportationStep data={data} updateData={updateData} />}
          {currentStep === 2 && <EnergyStep data={data} updateData={updateData} />}
          {currentStep === 3 && <DietStep data={data} updateData={updateData} />}
          {currentStep === 4 && <WasteStep data={data} updateData={updateData} />}
          {currentStep === 5 && results && <ResultsStep results={results} />}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === 5}>
              {currentStep === 4 ? "Calculate Results" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TransportationStep({
  data,
  updateData,
}: { data: CalculatorData; updateData: (field: keyof CalculatorData, value: string | number) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="carMiles">Miles driven per year</Label>
        <Input
          id="carMiles"
          type="number"
          placeholder="12000"
          value={data.carMiles || ""}
          onChange={(e) => updateData("carMiles", Number.parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <Label>Vehicle type</Label>
        <RadioGroup value={data.carType} onValueChange={(value) => updateData("carType", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gas" id="gas" />
            <Label htmlFor="gas">Gasoline car</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hybrid" id="hybrid" />
            <Label htmlFor="hybrid">Hybrid car</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="electric" id="electric" />
            <Label htmlFor="electric">Electric car</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">No car</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="publicTransport">Public transport miles per year</Label>
        <Input
          id="publicTransport"
          type="number"
          placeholder="2000"
          value={data.publicTransport || ""}
          onChange={(e) => updateData("publicTransport", Number.parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <Label htmlFor="flights">Flight hours per year</Label>
        <Input
          id="flights"
          type="number"
          placeholder="10"
          value={data.flights || ""}
          onChange={(e) => updateData("flights", Number.parseInt(e.target.value) || 0)}
        />
      </div>
    </div>
  )
}

function EnergyStep({ data, updateData }: { data: CalculatorData; updateData: (field: keyof CalculatorData, value: string | number) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="electricityBill">Monthly electricity bill ($)</Label>
        <Input
          id="electricityBill"
          type="number"
          placeholder="120"
          value={data.electricityBill || ''}
          onChange={(e) => updateData('electricityBill', Number.parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <Label htmlFor="gasUsage">Monthly gas usage (therms)</Label>
        <Input
          id="gasUsage"
          type="number"
          placeholder="50"
          value={data.gasUsage || ''}
          onChange={(e) => updateData('gasUsage', Number.parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <Label>Home size</Label>
        <Select value={data.homeSize} onValueChange={(value) => updateData('homeSize', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select home size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small\">Small (< 1000 sq ft)</SelectItem>
            <SelectItem value="medium">Medium (1000-2000 sq ft)</SelectItem>
            <SelectItem value="large">Large (2000-3000 sq ft)</SelectItem>
            <SelectItem value="very-large">Very Large (> 3000 sq ft)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Renewable energy usage</Label>
        <RadioGroup value={data.renewableEnergy} onValueChange={(value) => updateData('renewableEnergy', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="renewable-none" />
            <Label htmlFor="renewable-none">No renewable energy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="some" id="renewable-some" />
            <Label htmlFor="renewable-some\">Some renewable energy (< 50%)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="most" id="renewable-most" />
            <Label htmlFor="renewable-most">Mostly renewable (> 50%)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="renewable-all" />
            <Label htmlFor="renewable-all">100% renewable energy</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
function DietStep({ data, updateData }: { data: CalculatorData; updateData: (field: keyof CalculatorData, value: string | number) => void }) {\
  return (
    <div className="space-y-6">
      <div>
        <Label>Diet type</Label>
        <RadioGroup value={data.dietType} onValueChange={(value) => updateData('dietType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="meat-heavy" id="meat-heavy" />
            <Label htmlFor="meat-heavy">Meat-heavy (daily meat consumption)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="average" id="average" />
            <Label htmlFor="average">Average (meat 3-4 times per week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low-meat" id="low-meat" />
            <Label htmlFor="low-meat">Low meat (meat 1-2 times per week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id="vegan" />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Local food consumption</Label>
        <RadioGroup value={data.localFood} onValueChange={(value) => updateData('localFood', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rarely" id="local-rarely" />
            <Label htmlFor="local-rarely">Rarely buy local food</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="local-sometimes" />
            <Label htmlFor="local-sometimes">Sometimes buy local food</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="often" id="local-often" />
            <Label htmlFor="local-often">Often buy local food</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mostly" id="local-mostly" />
            <Label htmlFor="local-mostly">Mostly buy local food</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Food waste</Label>
        <RadioGroup value={data.foodWaste} onValueChange={(value) => updateData('foodWaste', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="waste-high" />
            <Label htmlFor="waste-high">High food waste</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="average" id="waste-average" />
            <Label htmlFor="waste-average">Average food waste</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="waste-low" />
            <Label htmlFor="waste-low">Low food waste</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="waste-minimal" />
            <Label htmlFor="waste-minimal">Minimal food waste</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
\
function WasteStep({ data, updateData }: { data: CalculatorData; updateData: (field: keyof CalculatorData, value: string | number) => void }) {\
  return (
    <div className="space-y-6">
      <div>
        <Label>Recycling habits</Label>
        <RadioGroup value={data.recycling} onValueChange={(value) => updateData('recycling', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="recycle-never" />
            <Label htmlFor="recycle-never">Never recycle</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="recycle-sometimes" />
            <Label htmlFor="recycle-sometimes">Sometimes recycle</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="often" id="recycle-often" />
            <Label htmlFor="recycle-often">Often recycle</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="always" id="recycle-always" />
            <Label htmlFor="recycle-always">Always recycle</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Waste reduction efforts</Label>
        <RadioGroup value={data.wasteReduction} onValueChange={(value) => updateData('wasteReduction', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="reduction-none" />
            <Label htmlFor="reduction-none">No special efforts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="some" id="reduction-some" />
            <Label htmlFor="reduction-some">Some waste reduction efforts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="reduction-active" />
            <Label htmlFor="reduction-active">Active waste reduction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="reduction-minimal" />
            <Label htmlFor="reduction-minimal">Minimal waste lifestyle</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Packaging choices</Label>
        <RadioGroup value={data.packaging} onValueChange={(value) => updateData('packaging', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ignore" id="packaging-ignore" />
            <Label htmlFor="packaging-ignore">Don't consider packaging</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="packaging-sometimes" />
            <Label htmlFor="packaging-sometimes">Sometimes avoid excess packaging</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="often" id="packaging-often" />
            <Label htmlFor="packaging-often">Often choose minimal packaging</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="always" id="packaging-always" />
            <Label htmlFor="packaging-always">Always choose minimal packaging</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function ResultsStep({ results }: { results: { total: number; breakdown: any } }) {\
  const getFootprintLevel = (total: number) => {\
    if (total < 8) return { level: "Excellent\", color: \"text-green-600\", description: \"Well below average!" }\
    if (total < 12) return { level: "Good\", color: \"text-blue-600\", description: \"Below average" }\
    if (total < 16) return { level: "Average\", color: \"text-yellow-600\", description: \"About average" }\
    if (total < 20) return { level: "High\", color: \"text-orange-600\", description: \"Above average" }\
    return { level: "Very High", color: "text-red-600", description: "Well above average" }
  }

  const footprintLevel = getFootprintLevel(results.total)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">{results.total} tons</div>
        <div className="text-lg text-muted-foreground mb-4">CO₂ equivalent per year</div>
        <Badge variant="outline" className={`${footprintLevel.color} text-lg px-4 py-2`}>
          {footprintLevel.level}
        </Badge>
        <p className="text-sm text-muted-foreground mt-2">{footprintLevel.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Car className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Transportation</span>
              </div>
              <span className="font-semibold">{results.breakdown.transportation}t</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Energy</span>
              </div>
              <span className="font-semibold">{results.breakdown.energy}t</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Diet</span>
              </div>
              <span className="font-semibold">{results.breakdown.diet}t</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trash2 className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Waste</span>
              </div>
              <span className="font-semibold">{results.breakdown.waste}t</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">What does this mean?</h4>
        <p className="text-sm text-muted-foreground">
          The average American produces about 16 tons of CO₂ per year. Your footprint of {results.total} tons is {results.total < 16 ? 'below' : 'above'} average.
          Consider exploring our eco recommendations to reduce your impact further.
        </p>
      </div>
    </div>
  )
}

// Helper functions for carbon footprint calculations
function getCarEmissionFactor(carType: string): number {\
  switch (carType) {
    case 'gas': return 0.89
    case 'hybrid': return 0.45
    case 'electric': return 0.2
    case 'none': return 0
    default: return 0.89
  }
}

function getHomeSizeMultiplier(homeSize: string): number {
  switch (homeSize) {
    case 'small': return 0.5
    case 'medium': return 1
    case 'large': return 1.5
    case 'very-large': return 2
    default: return 1
  }
}

function getRenewableDiscount(renewableEnergy: string): number {
  switch (renewableEnergy) {
    case 'none': return 0
    case 'some': return 1
    case 'most': return 2
    case 'all': return 3
    default: return 0
  }
}

function getDietEmissions(dietType: string): number {
  switch (dietType) {
    case 'meat-heavy': return 3.3
    case 'average': return 2.5
    case 'low-meat': return 1.9
    case 'vegetarian': return 1.7
    case 'vegan': return 1.5
    default: return 2.5
  }
}

function getLocalFoodDiscount(localFood: string): number {
  switch (localFood) {
    case 'rarely': return 0.3
    case 'sometimes': return 0.1
    case 'often': return -0.1
    case 'mostly': return -0.3
    default: return 0
  }
}

function getFoodWasteImpact(foodWaste: string): number {
  switch (foodWaste) {
    case 'high': return 0.5
    case 'average': return 0.2
    case 'low': return 0.1
    case 'minimal': return 0
    default: return 0.2
  }
}

function getWasteEmissions(recycling: string, wasteReduction: string, packaging: string): number {
  let base = 1.2
  
  // Recycling impact
  switch (recycling) {
    case 'never': base += 0.3; break
    case 'sometimes': base += 0.1; break
    case 'often': base -= 0.1; break
    case 'always': base -= 0.3; break
  }
  
  // Waste reduction impact
  switch (wasteReduction) {
    case 'none': base += 0.2; break
    case 'some': base += 0.1; break
    case 'active': base -= 0.1; break
    case 'minimal': base -= 0.3; break
  }
  
  // Packaging impact
  switch (packaging) {
    case 'ignore': base += 0.1; break
    case 'sometimes': base += 0.05; break
    case 'often': base -= 0.05; break
    case 'always': base -= 0.1; break
  }
  
  return Math.max(0, base)
}
