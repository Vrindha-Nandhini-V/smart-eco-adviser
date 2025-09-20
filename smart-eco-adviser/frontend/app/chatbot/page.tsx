"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send } from "lucide-react"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/gemini/eco-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      const botMessage = { role: "bot", text: data.advice || "Sorry, I couldn’t fetch a response." }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "Error: Unable to reach the server." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage()
    }
  }

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
              <CardTitle>Chat with Smart Eco Advisor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto space-y-4 p-2 border rounded-lg bg-muted/30">
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-center mt-10">
                    Start the conversation by asking your first eco-friendly question 🌍
                  </p>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "mr-auto bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                <Button onClick={sendMessage} disabled={loading}>
                  {loading ? "..." : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
