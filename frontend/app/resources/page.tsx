import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, FileText, BookOpen, HelpCircle, Download } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DharmaSetu</span>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center gap-4">
            <Link href="/app">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resources</h1>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Access documentation, guides, and help to make the most of DharmaSetu
            </p>
          </div>

          <Tabs defaultValue="documentation" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="help" id="help">
                Help Center
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documentation">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Getting Started Guide",
                    description: "Learn the basics of DharmaSetu and how to use its core features",
                    icon: <BookOpen className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Legal Assistant Documentation",
                    description: "Detailed guide on using the Legal Answer Assistant module",
                    icon: <FileText className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Language Simplifier Guide",
                    description: "How to use the Legal Language Simplifier effectively",
                    icon: <FileText className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Community Hub Manual",
                    description: "Learn how to engage with the community and create petitions",
                    icon: <FileText className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Case Predictor Documentation",
                    description: "Detailed guide on using the Case Predictor and Resolution Tool",
                    icon: <FileText className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Contract Review Guide",
                    description: "How to use the Contract Review and Compliance Checker",
                    icon: <FileText className="h-6 w-6 text-primary" />,
                  },
                ].map((resource, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        {resource.icon}
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <a href="/DharmaSetuGuide.pdf" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full gap-2">
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="help">
              <div className="grid gap-6 md:grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find answers to common questions about DharmaSetu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        question: "How do I translate content to my regional language?",
                        answer: "You can use the built-in translation feature available in the settings menu to translate content into supported regional languages.",
                      },
                      {
                        question: "Can I download my case predictions for offline use?",
                        answer: "Yes, you can download case predictions as PDF files by clicking the 'Download' button on the results page.",
                      },
                      {
                        question: "How secure is my document data when using the platform?",
                        answer: "Your data is encrypted and stored securely. We follow industry-standard security practices to ensure your information is safe.",
                      },
                      {
                        question: "How can I create a community petition?",
                        answer: "Navigate to the 'Community Hub' section and click on 'Create Petition' to start a new petition.",
                      },
                      {
                        question: "What legal jurisdictions does DharmaSetu cover?",
                        answer: "DharmaSetu currently supports legal jurisdictions in India, including state and central laws.",
                      },
                    ].map((faq, index) => (
                      <div key={index} className="border-b pb-4">
                        <h3 className="font-medium text-lg">{faq.question}</h3>
                        <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-gray-500">© 2025 DharmaSetu. All rights reserved.</div>
      </footer>
    </div>
  )
}