import { Navigation } from "@/components/navigation"
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <UserProfile />
      </main>
    </div>
  )
}
