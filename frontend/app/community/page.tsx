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
  Share2,
  Bell,
  User,
  Home,
  Scale,
  Clock,
  TrendingUp,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for petitions
const MOCK_PETITIONS = [
  {
    id: 1,
    title: "Petition for Better Public Transport in Eastern Suburbs",
    description:
      "We demand increased frequency of buses and new routes to connect the eastern suburbs to the city center.",
    category: "Transportation",
    target: 5000,
    signatures: 2245,
    deadline: "15 days left",
    createdBy: "Citizens for Better Transport",
    createdAt: "2 weeks ago",
    status: "Active",
    signed: false, // Added signed property
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
    signed: false,
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
    signed: false,
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
    signed: false,
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
    signed: false,
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("home") // Updated to include "home", "recent", and "trending"
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState<"issue" | "petition">("petition")
  const [petitions, setPetitions] = useState(MOCK_PETITIONS)
  const [selectedCategory, setSelectedCategory] = useState("")

  // Form states
  const [fullName, setFullName] = useState("")
  const [parentInfo, setParentInfo] = useState("")
  const [state, setState] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [target, setTarget] = useState("1000")
  const [deadline, setDeadline] = useState("30")

  const handleCreateNew = (type: "issue" | "petition") => {
    setCreateType(type)
    setShowCreateDialog(true)
  }

  const handleSignPetition = (id: number) => {
    if (window.confirm("Are you sure you want to sign this petition?")) {
      setPetitions((prev) =>
        prev.map((petition) =>
          petition.id === id
            ? {
                ...petition,
                signatures: Math.min(petition.signatures + 1, petition.target), // Increment by 1
                signed: true, // Mark as signed
                status: petition.signatures + 1 >= petition.target ? "Completed" : petition.status, // Update status
              }
            : petition
        )
      )
    }
  }

  const handleSubmit = async () => {
    const newPetition = {
      full_name: fullName,
      parent_info: parentInfo,
      state,
      issue: description,
      title,
      category,
      target: parseInt(target),
      deadline: `${deadline} days left`,
    };

    try {
      const response = await fetch("/api/petitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPetition),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        const createdPetition = await response.json();
        console.log("Created petition:", createdPetition);
        setPetitions((prev) => [createdPetition, ...prev]);
        setShowCreateDialog(false);
        setFullName("");
        setParentInfo("");
        setState("");
        setTitle("");
        setDescription("");
        setCategory("");
        setTarget("1000");
        setDeadline("30");
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Failed to create petition:", errorData.error || "Unknown error");
          alert(`Error: ${errorData.error || "Failed to create petition"}`);
        } else {
          const errorText = await response.text();
          console.error("Failed to create petition:", errorText);
          alert("Error: An unexpected error occurred. Please check the server logs.");
        }
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Error: An unexpected error occurred");
      }
    }
  };

  // Filter petitions based on the selected tab and search query
  const filteredPetitions = petitions
    .filter((petition) => {
      const query = searchQuery.toLowerCase();
      return (
        petition.title.toLowerCase().includes(query) ||
        petition.description.toLowerCase().includes(query)
      );
    })
    .filter((petition) => {
      if (sortOption === "recent") {
        return petition.createdAt === "1 week ago"; // Match petitions with "1 week ago" in mock data
      }
      if (sortOption === "trending") {
        return petition.signatures / petition.target >= 0.5; // Example: Trending if 50% or more signatures achieved
      }
      return selectedCategory === "" || petition.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortOption === "trending") {
        return b.signatures / b.target - a.signatures / a.target; // Sort by percentage of signatures achieved
      }
      return 0;
    })
    .slice(0, sortOption === "trending" ? 3 : undefined); // Limit to top 3 for trending

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Scale className="h-6 w-6 text-primary" />
            <span>DharmaSetu</span>
          </Link>
          <MainNav className="mx-6" />
        </div>
      </header>

      <div className="container grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
        {/* Sidebar */}
        <div className="hidden md:block space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Community Hub</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setSortOption("home")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    sortOption === "home" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
                <button
                  onClick={() => setSortOption("recent")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    sortOption === "recent" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <Clock className="h-4 w-4" /> {/* Replace with Clock icon */}
                  Recent
                </button>
                <button
                  onClick={() => setSortOption("trending")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    sortOption === "trending" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" /> {/* Replace with TrendingUp icon */}
                  Trending
                </button>
              </nav>
            </div>
            <Separator />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between cursor-pointer ${
                    selectedCategory === "" ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  <span className="text-sm">All Categories</span>
                  <Badge variant="secondary" className="text-xs">
                    {petitions.length}
                  </Badge>
                </div>
                {["Transportation", "Environment", "Senior Welfare", "Safety", "Education"].map(
                  (category) => (
                    <div
                      key={category}
                      className={`flex items-center justify-between cursor-pointer ${
                        selectedCategory === category ? "text-primary font-semibold" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {
                          petitions.filter(
                            (petition) => petition.category === category
                          ).length
                        }
                      </Badge>
                    </div>
                  )
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
                placeholder="Search petitions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Create New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Petition</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="petition">
                  <TabsContent value="petition" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label htmlFor="full-name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="full-name"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="parent-info" className="text-sm font-medium">
                        Parent/Guardian Information
                      </label>
                      <Input
                        id="parent-info"
                        placeholder="Enter parent/guardian information"
                        value={parentInfo}
                        onChange={(e) => setParentInfo(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium">
                        State
                      </label>
                      <Input
                        id="state"
                        placeholder="Enter your state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
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
                        Issue Description
                      </label>
                      <Textarea
                        id="petition-description"
                        placeholder="Describe your issue"
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
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="environment">Environment</SelectItem>
                            <SelectItem value="senior-welfare">Senior Welfare</SelectItem>
                            <SelectItem value="safety">Safety</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
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

          <div className="space-y-4">
            {filteredPetitions.map((petition) => (
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
                    <Badge className={petition.status === "Completed" ? "bg-green-500 text-white" : ""}>
                      {petition.status}
                    </Badge>
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
                      <Button
                        size="sm"
                        className={petition.signed ? "bg-green-500" : ""}
                        onClick={() => handleSignPetition(petition.id)}
                        disabled={petition.signed || petition.status === "Completed"} // Disable if signed or completed
                      >
                        {petition.signed ? "Signed Petition" : petition.status === "Completed" ? "Completed" : "Sign Petition"}
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
          </div>
        </div>
      </div>
    </div>
  )
}
