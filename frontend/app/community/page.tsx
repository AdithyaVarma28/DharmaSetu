"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  PlusCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Filter,
  TrendingUp,
  Clock,
  Award,
  Bell,
  User,
  Home,
  Scale,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for issues and petitions
const MOCK_ISSUES = [
  {
    id: 1,
    title: "Inadequate Street Lighting in Sector 7",
    description:
      "The street lights in Sector 7 have been non-functional for over a month, creating safety concerns for residents.",
    category: "Infrastructure",
    location: "Delhi, Sector 7",
    createdBy: "Rahul Sharma",
    createdAt: "2 days ago",
    status: "Open",
    votes: { up: 45, down: 3 },
    comments: 12,
  },
  {
    id: 2,
    title: "Delay in Ration Card Processing",
    description:
      "Applied for a ration card 3 months ago but still haven't received any update on the application status.",
    category: "Government Services",
    location: "Mumbai, Andheri East",
    createdBy: "Priya Patel",
    createdAt: "1 week ago",
    status: "Under Review",
    votes: { up: 78, down: 5 },
    comments: 23,
  },
  {
    id: 3,
    title: "Water Contamination in Residential Area",
    description: "Residents of Green Park have been receiving contaminated water supply for the past two weeks.",
    category: "Public Health",
    location: "Bangalore, Green Park",
    createdBy: "Ananya Singh",
    createdAt: "3 days ago",
    status: "Escalated",
    votes: { up: 132, down: 2 },
    comments: 45,
  },
  {
    id: 4,
    title: "Pothole Hazards on Main Road",
    description: "Multiple large potholes on the main road causing accidents and vehicle damage.",
    category: "Infrastructure",
    location: "Chennai, Anna Nagar",
    createdBy: "Karthik Rajan",
    createdAt: "5 days ago",
    status: "Open",
    votes: { up: 89, down: 1 },
    comments: 34,
  },
  {
    id: 5,
    title: "Irregular Garbage Collection",
    description: "Garbage collection has been irregular for the past month leading to waste accumulation.",
    category: "Sanitation",
    location: "Hyderabad, Jubilee Hills",
    createdBy: "Sanjay Reddy",
    createdAt: "4 days ago",
    status: "Open",
    votes: { up: 67, down: 4 },
    comments: 19,
  },
]

const MOCK_PETITIONS = [
  {
    id: 1,
    title: "Petition for Better Public Transport in Eastern Suburbs",
    description:
      "We demand increased frequency of buses and new routes to connect the eastern suburbs to the city center.",
    category: "Transportation",
    target: 5000,
    signatures: 3245,
    deadline: "15 days left",
    createdBy: "Citizens for Better Transport",
    createdAt: "2 weeks ago",
    status: "Active",
  },
  {
    id: 2,
    title: "Implement Plastic Ban in Local Markets",
    description: "Petition to enforce strict plastic ban in all local markets to reduce environmental pollution.",
    category: "Environment",
    target: 2000,
    signatures: 1876,
    deadline: "7 days left",
    createdBy: "Green Earth Initiative",
    createdAt: "3 weeks ago",
    status: "Active",
  },
  {
    id: 3,
    title: "Demand for Senior Citizen Facilities in Public Parks",
    description: "Requesting dedicated areas and facilities for senior citizens in all public parks of the city.",
    category: "Senior Welfare",
    target: 1000,
    signatures: 876,
    deadline: "30 days left",
    createdBy: "Senior Citizens Association",
    createdAt: "1 week ago",
    status: "Active",
  },
  {
    id: 4,
    title: "Improve Road Safety Measures Near Schools",
    description: "Petition for speed breakers, traffic signals, and crossing guards near all schools in the district.",
    category: "Safety",
    target: 3000,
    signatures: 2150,
    deadline: "10 days left",
    createdBy: "Parents Safety Coalition",
    createdAt: "2 weeks ago",
    status: "Active",
  },
  {
    id: 5,
    title: "Extend Library Hours on Weekends",
    description: "Request to extend public library hours on weekends to accommodate working professionals.",
    category: "Education",
    target: 1500,
    signatures: 980,
    deadline: "20 days left",
    createdBy: "Community Readers Group",
    createdAt: "1 week ago",
    status: "Active",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("issues")
  const [sortOption, setSortOption] = useState("trending")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState<"issue" | "petition">("issue")

  // Form states
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [target, setTarget] = useState("1000")
  const [deadline, setDeadline] = useState("30")

  const handleCreateNew = (type: "issue" | "petition") => {
    setCreateType(type)
    setShowCreateDialog(true)
  }

  const handleSubmit = () => {
    // Here you would normally submit the data to your backend
    // For now, we'll just close the dialog and reset the form
    setShowCreateDialog(false)
    setTitle("")
    setDescription("")
    setCategory("")
    setLocation("")
    setTarget("1000")
    setDeadline("30")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Scale className="h-6 w-6 text-primary" />
            <span>DharmaSetu</span>
          </Link>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
        {/* Sidebar */}
        <div className="hidden md:block space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Community Hub</h3>
              <nav className="space-y-2">
                <Link
                  href="/community"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Award className="h-4 w-4" />
                  Popular
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Clock className="h-4 w-4" />
                  Recent
                </Link>
              </nav>
            </div>
            <Separator />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {["Infrastructure", "Government Services", "Public Health", "Environment", "Education", "Safety"].map(
                  (category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.floor(Math.random() * 50) + 10}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search issues or petitions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New {createType === "issue" ? "Issue" : "Petition"}</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="issue" onValueChange={(value) => setCreateType(value as "issue" | "petition")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="issue">Issue</TabsTrigger>
                      <TabsTrigger value="petition">Petition</TabsTrigger>
                    </TabsList>
                    <TabsContent value="issue" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Title
                        </label>
                        <Input
                          id="title"
                          placeholder="Enter a clear title for your issue"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          placeholder="Describe the issue in detail"
                          className="min-h-[100px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium">
                            Category
                          </label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="government">Government Services</SelectItem>
                              <SelectItem value="health">Public Health</SelectItem>
                              <SelectItem value="environment">Environment</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="safety">Safety</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium">
                            Location
                          </label>
                          <Input
                            id="location"
                            placeholder="City, Area"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="petition" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="petition-title" className="text-sm font-medium">
                          Petition Title
                        </label>
                        <Input
                          id="petition-title"
                          placeholder="Enter a clear title for your petition"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="petition-description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          id="petition-description"
                          placeholder="Describe what you're petitioning for and why"
                          className="min-h-[100px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="petition-category" className="text-sm font-medium">
                            Category
                          </label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="petition-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="government">Government Services</SelectItem>
                              <SelectItem value="health">Public Health</SelectItem>
                              <SelectItem value="environment">Environment</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="safety">Safety</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="target" className="text-sm font-medium">
                            Target Signatures
                          </label>
                          <Input
                            id="target"
                            type="number"
                            placeholder="1000"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="deadline" className="text-sm font-medium">
                          Deadline (days)
                        </label>
                        <Input
                          id="deadline"
                          type="number"
                          placeholder="30"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Tabs defaultValue="issues" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="petitions">Petitions</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                className="text-sm border rounded-md px-2 py-1"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="votes">Most Votes</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === "issues" ? (
              <>
                {MOCK_ISSUES.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg hover:text-primary cursor-pointer">{issue.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{issue.category}</Badge>
                            <span className="text-xs text-gray-500">{issue.location}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            issue.status === "Open"
                              ? "default"
                              : issue.status === "Under Review"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">{issue.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2 pt-0">
                      <Separator />
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{issue.createdBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">
                            {issue.createdBy} • {issue.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">{issue.votes.up}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">{issue.votes.down}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">{issue.comments}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                <div className="flex justify-center mt-6">
                  <Button variant="outline" onClick={() => handleCreateNew("issue")}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Issue
                  </Button>
                </div>
              </>
            ) : (
              <>
                {MOCK_PETITIONS.map((petition) => (
                  <Card key={petition.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg hover:text-primary cursor-pointer">{petition.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{petition.category}</Badge>
                            <span className="text-xs text-gray-500">{petition.deadline}</span>
                          </div>
                        </div>
                        <Badge>{petition.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">{petition.description}</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {petition.signatures} of {petition.target} signatures
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (petition.signatures / petition.target) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2 pt-0">
                      <Separator />
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{petition.createdBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">
                            {petition.createdBy} • {petition.createdAt}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Sign Petition</Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                <div className="flex justify-center mt-6">
                  <Button variant="outline" onClick={() => handleCreateNew("petition")}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Petition
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
