"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthWrapper from "@/components/AuthWrapper"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { adminAPI, challengeAPI } from "@/lib/api"
import { Users, Trophy, TrendingDown, Activity, Plus, Edit, Trash2, Eye, UserCog, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [challenges, setChallenges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    category: "transportation",
    type: "daily",
    difficulty: "easy",
    points: 50,
    co2Impact: 1.0,
    duration: "1 day",
    maxProgress: 1
  })
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'admin') {
        router.push('/')
        return
      }
    }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [statsData, usersData, challengesData] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllUsers(),
        challengeAPI.getChallenges()
      ])
      setStats(statsData)
      setUsers(usersData)
      setChallenges(challengesData)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateChallenge = async () => {
    try {
      await challengeAPI.createChallenge(newChallenge)
      toast({
        title: "Success",
        description: "Challenge created successfully"
      })
      setIsCreateDialogOpen(false)
      loadData()
      setNewChallenge({
        title: "",
        description: "",
        category: "transportation",
        type: "daily",
        difficulty: "easy",
        points: 50,
        co2Impact: 1.0,
        duration: "1 day",
        maxProgress: 1
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create challenge",
        variant: "destructive"
      })
    }
  }

  const handleDeleteChallenge = async (id: string) => {
    if (!confirm("Are you sure you want to delete this challenge?")) return
    
    try {
      await challengeAPI.deleteChallenge(id)
      toast({
        title: "Success",
        description: "Challenge deleted successfully"
      })
      loadData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete challenge",
        variant: "destructive"
      })
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await adminAPI.updateUserRole(userId, newRole)
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`
      })
      setIsRoleDialogOpen(false)
      setSelectedUser(null)
      loadData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user role",
        variant: "destructive"
      })
    }
  }

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) return
    
    try {
      await adminAPI.deleteUser(userId)
      toast({
        title: "Success",
        description: "User deleted successfully"
      })
      loadData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage challenges and monitor user progress</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Challenges</p>
                    <p className="text-2xl font-bold">{stats?.activeChallenges || 0}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Challenges</p>
                    <p className="text-2xl font-bold">{stats?.completedChallenges || 0}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total CO₂ Saved</p>
                    <p className="text-2xl font-bold">{stats?.totalCO2Saved || 0}kg</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <TrendingDown className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Users Overview</TabsTrigger>
              <TabsTrigger value="challenges">Manage Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle>User Progress</CardTitle>
                  <CardDescription>Monitor all users and their eco-friendly activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-center">
                            <p className="font-semibold text-green-600">{user.carbonFootprint}kg</p>
                            <p className="text-muted-foreground">CO₂</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-blue-600">{user.ecoActions}</p>
                            <p className="text-muted-foreground">Actions</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-purple-600">{user.completedChallenges}</p>
                            <p className="text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-orange-600">{user.activeChallenges}</p>
                            <p className="text-muted-foreground">Active</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsRoleDialogOpen(true)
                              }}
                              title="Change Role"
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">All Challenges</h3>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Challenge
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Challenge</DialogTitle>
                      <DialogDescription>Add a new eco-friendly challenge for users</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newChallenge.title}
                          onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                          placeholder="Challenge title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newChallenge.description}
                          onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                          placeholder="Challenge description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={newChallenge.category} onValueChange={(v) => setNewChallenge({...newChallenge, category: v})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="transportation">Transportation</SelectItem>
                              <SelectItem value="energy">Energy</SelectItem>
                              <SelectItem value="diet">Diet</SelectItem>
                              <SelectItem value="waste">Waste</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="type">Type</Label>
                          <Select value={newChallenge.type} onValueChange={(v) => setNewChallenge({...newChallenge, type: v})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="difficulty">Difficulty</Label>
                          <Select value={newChallenge.difficulty} onValueChange={(v) => setNewChallenge({...newChallenge, difficulty: v})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="points">Points</Label>
                          <Input
                            id="points"
                            type="number"
                            value={newChallenge.points}
                            onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="co2Impact">CO₂ Impact (kg)</Label>
                          <Input
                            id="co2Impact"
                            type="number"
                            step="0.1"
                            value={newChallenge.co2Impact}
                            onChange={(e) => setNewChallenge({...newChallenge, co2Impact: parseFloat(e.target.value)})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            value={newChallenge.duration}
                            onChange={(e) => setNewChallenge({...newChallenge, duration: e.target.value})}
                            placeholder="e.g., 7 days"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="maxProgress">Max Progress</Label>
                          <Input
                            id="maxProgress"
                            type="number"
                            value={newChallenge.maxProgress}
                            onChange={(e) => setNewChallenge({...newChallenge, maxProgress: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleCreateChallenge} className="bg-gradient-to-r from-green-500 to-emerald-600">
                        Create Challenge
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {challenges.map((challenge) => (
                  <Card key={challenge._id} className="border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="capitalize">{challenge.category}</Badge>
                            <Badge variant="outline" className="capitalize">{challenge.type}</Badge>
                            <Badge variant="outline" className="capitalize">{challenge.difficulty}</Badge>
                            <Badge variant="outline">{challenge.points} pts</Badge>
                            <Badge variant="outline">{challenge.co2Impact}kg CO₂</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteChallenge(challenge._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Role Change Dialog */}
          <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change User Role</DialogTitle>
                <DialogDescription>
                  Update the role for {selectedUser?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Current Role</Label>
                  <p className="text-sm text-muted-foreground">User</p>
                </div>
                <div className="space-y-2">
                  <Label>Select New Role</Label>
                  <Select
                    defaultValue="user"
                    onValueChange={(value) => {
                      if (selectedUser) {
                        handleUpdateUserRole(selectedUser._id, value)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          User
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  Admins have full access to manage users and challenges.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </AuthWrapper>
  )
}
