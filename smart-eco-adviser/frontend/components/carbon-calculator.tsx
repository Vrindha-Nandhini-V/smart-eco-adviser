"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Car, Home, Utensils, Trash2, ChevronLeft, ChevronRight, Calculator, CheckCircle } from "lucide-react"
import { carbonAPI } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CalculatorData {
  carKm: number | string
  carType: string
  publicTransportKm: number | string
  flights: number | string
  electricityKWh: number | string
  lpgCylinders: number | string
  homeSize: string
  renewableEnergy: string
  dietType: string
  localFood: string
  foodWaste: number | string
  recycling: string
  wasteReduction: string
  packaging: string
}

const initialData: CalculatorData = {
  carKm: "",
  carType: "",
  publicTransportKm: "",
  flights: "",
  electricityKWh: "",
  lpgCylinders: "",
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

function parseNum(v: number | string) {
  if (typeof v === "number") return v
  if (!v) return 0
  const cleaned = String(v).replace(/,/g, "").trim()
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<CalculatorData>(initialData)
  const [results, setResults] = useState<{ total: number; breakdown: any } | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const updateData = (field: keyof CalculatorData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    const carKm = parseNum(data.carKm)
    const publicKm = parseNum(data.publicTransportKm)
    const flights = parseNum(data.flights)
    const kwh = parseNum(data.electricityKWh)
    const lpg = parseNum(data.lpgCylinders)
    const foodWaste = parseNum(data.foodWaste)

    const transportationCO2 =
      carKm * getCarEmissionFactor(data.carType) +
      publicKm * 0.05 +
      flights * 150

    const energyCO2 =
      kwh * 0.82 +
      lpg * 60 +
      getHomeSizeMultiplier(data.homeSize) -
      getRenewableDiscount(data.renewableEnergy)

    const dietCO2 =
      getDietEmissions(data.dietType) +
      getLocalFoodDiscount(data.localFood) +
      getFoodWasteImpact(foodWaste)

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

  const saveToBackend = async () => {
    if (!results) return
    
    setSaving(true)
    try {
      await carbonAPI.saveCalculation(results.total, results.breakdown)
      toast({
        title: "Success!",
        description: "Your carbon footprint has been saved. Check your analytics dashboard!",
      })
      setTimeout(() => {
        router.push('/analytics')
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save calculation",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => {
      if (prev === 4) calculateFootprint()
      return Math.min(prev + 1, steps.length)
    })
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

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
          {currentStep === 5 && results && <ResultsStep results={results} onSave={saveToBackend} saving={saving} />}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
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

/* Steps */
function TransportationStep({
  data,
  updateData,
}: {
  data: CalculatorData
  updateData: (field: keyof CalculatorData, value: string | number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="carKm">Kilometres driven per year (km)</Label>
        <Input
          id="carKm"
          type="text"
          inputMode="numeric"
          placeholder="20000"
          value={String(data.carKm)}
          onChange={(e) => updateData("carKm", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>

      <div>
        <Label>Vehicle type</Label>
        <RadioGroup value={data.carType} onValueChange={(v) => updateData("carType", v)}>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="gas" id="car-gas" />
            <span>Petrol / Diesel</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="hybrid" id="car-hybrid" />
            <span>Hybrid</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="electric" id="car-electric" />
            <span>Electric</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="none" id="car-none" />
            <span>No car</span>
          </label>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="publicTransportKm">Public transport kilometres per year</Label>
        <Input
          id="publicTransportKm"
          type="text"
          inputMode="numeric"
          placeholder="5000"
          value={String(data.publicTransportKm)}
          onChange={(e) => updateData("publicTransportKm", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>

      <div>
        <Label htmlFor="flights">Flights per year</Label>
        <Input
          id="flights"
          type="text"
          inputMode="numeric"
          placeholder="2"
          value={String(data.flights)}
          onChange={(e) => updateData("flights", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>
    </div>
  )
}

function EnergyStep({
  data,
  updateData,
}: {
  data: CalculatorData
  updateData: (field: keyof CalculatorData, value: string | number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="electricityKWh">Monthly electricity use (kWh)</Label>
        <Input
          id="electricityKWh"
          type="text"
          inputMode="numeric"
          placeholder="300"
          value={String(data.electricityKWh)}
          onChange={(e) => updateData("electricityKWh", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>

      <div>
        <Label htmlFor="lpgCylinders">Monthly LPG cylinders (count)</Label>
        <Input
          id="lpgCylinders"
          type="text"
          inputMode="numeric"
          placeholder="1"
          value={String(data.lpgCylinders)}
          onChange={(e) => updateData("lpgCylinders", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>

      <div>
        <Label>Home size</Label>
        <Select value={data.homeSize} onValueChange={(v) => updateData("homeSize", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select home size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (&lt; 1000 sq ft)</SelectItem>
            <SelectItem value="medium">Medium (1000-2000 sq ft)</SelectItem>
            <SelectItem value="large">Large (2000-3000 sq ft)</SelectItem>
            <SelectItem value="very-large">Very Large (&gt; 3000 sq ft)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Renewable energy usage</Label>
        <RadioGroup value={data.renewableEnergy} onValueChange={(v) => updateData("renewableEnergy", v)}>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="none" id="ren-none" />
            <span>No renewable energy</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="some" id="ren-some" />
            <span>Some (&lt;50%)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="most" id="ren-most" />
            <span>Mostly (&gt;50%)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="all" id="ren-all" />
            <span>100% renewable</span>
          </label>
        </RadioGroup>
      </div>
    </div>
  )
}

function DietStep({
  data,
  updateData,
}: {
  data: CalculatorData
  updateData: (field: keyof CalculatorData, value: string | number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Diet type</Label>
        <RadioGroup value={data.dietType} onValueChange={(v) => updateData("dietType", v)}>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="meat-heavy" id="diet-meat" />
            <span>Meat-heavy</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="omnivore" id="diet-omni" />
            <span>Omnivore</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="vegetarian" id="diet-veg" />
            <span>Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="vegan" id="diet-vegan" />
            <span>Vegan</span>
          </label>
        </RadioGroup>
      </div>

      <div>
        <Label>Percent local food</Label>
        <Select value={data.localFood} onValueChange={(v) => updateData("localFood", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (&lt;25%)</SelectItem>
            <SelectItem value="medium">Medium (25-50%)</SelectItem>
            <SelectItem value="high">High (&gt;50%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Food waste (percent)</Label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="10"
          value={String(data.foodWaste)}
          onChange={(e) => updateData("foodWaste", e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>
    </div>
  )
}

function WasteStep({
  data,
  updateData,
}: {
  data: CalculatorData
  updateData: (field: keyof CalculatorData, value: string | number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Recycling level</Label>
        <Select value={data.recycling} onValueChange={(v) => updateData("recycling", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="some">Some</SelectItem>
            <SelectItem value="most">Most</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Waste reduction actions</Label>
        <Select value={data.wasteReduction} onValueChange={(v) => updateData("wasteReduction", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="some">Some</SelectItem>
            <SelectItem value="lots">Lots</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Packaging (low / medium / high)</Label>
        <Select value={data.packaging} onValueChange={(v) => updateData("packaging", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function ResultsStep({ results, onSave, saving }: { results: { total: number; breakdown: any }, onSave: () => void, saving: boolean }) {
  const nationalAverage = 16000 // kg CO2e per year
  const percentageVsAverage = ((nationalAverage - results.total) / nationalAverage) * 100

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Your Annual Carbon Footprint</h3>
        <div className="text-4xl font-bold text-green-600 mb-2">{results.total.toLocaleString()} kg CO₂e</div>
        {percentageVsAverage > 0 ? (
          <p className="text-sm text-muted-foreground">
            <CheckCircle className="inline h-4 w-4 mr-1 text-green-600" />
            {percentageVsAverage.toFixed(1)}% below national average!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {Math.abs(percentageVsAverage).toFixed(1)}% above national average
          </p>
        )}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg">Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Transportation</div>
                <div className="font-semibold">{results.breakdown.transportation} kg</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Home className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Energy</div>
                <div className="font-semibold">{results.breakdown.energy} kg</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Utensils className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Diet</div>
                <div className="font-semibold">{results.breakdown.diet} kg</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Trash2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Waste</div>
                <div className="font-semibold">{results.breakdown.waste} kg</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onSave} 
        disabled={saving}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        size="lg"
      >
        {saving ? "Saving..." : "Save & View Analytics"}
      </Button>
    </div>
  )
}

/* helpers */
function getCarEmissionFactor(type: string) {
  switch (type) {
    case "gas":
      return 0.25
    case "hybrid":
      return 0.155
    case "electric":
      return 0.09
    default:
      return 0
  }
}

function getHomeSizeMultiplier(size: string) {
  switch (size) {
    case "small":
      return 100
    case "medium":
      return 200
    case "large":
      return 350
    case "very-large":
      return 500
    default:
      return 200
  }
}

function getRenewableDiscount(level: string) {
  switch (level) {
    case "none":
      return 0
    case "some":
      return 30
    case "most":
      return 80
    case "all":
      return 150
    default:
      return 0
  }
}

function getDietEmissions(diet: string) {
  switch (diet) {
    case "meat-heavy":
      return 2000
    case "omnivore":
      return 1500
    case "vegetarian":
      return 1000
    case "vegan":
      return 800
    default:
      return 1500
  }
}

function getLocalFoodDiscount(local: string) {
  switch (local) {
    case "low":
      return 0
    case "medium":
      return -50
    case "high":
      return -120
    default:
      return 0
  }
}

function getFoodWasteImpact(percent: number) {
  return (percent / 100) * 500
}

function getWasteEmissions(recycling: string, reduction: string, packaging: string) {
  let total = 0
  if (recycling === "none") total += 300
  if (recycling === "some") total += 180
  if (recycling === "most") total += 80

  if (reduction === "none") total += 200
  if (reduction === "some") total += 100
  if (reduction === "lots") total += 30

  if (packaging === "low") total += 20
  if (packaging === "medium") total += 80
  if (packaging === "high") total += 180

  return total
}
