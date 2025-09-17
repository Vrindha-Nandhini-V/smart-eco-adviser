import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
            <p className="text-muted-foreground">Get instant answers to your sustainability questions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>The AI chat assistant will be available in the next update.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature will provide an interactive chatbot to answer your sustainability questions and provide
                guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
