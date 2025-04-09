import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, Scale, FileText, Users } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function Home() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Bridging Law and Citizens Through AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Making law accessible, transparent, and actionable for everyone regardless of background.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/app">
                    <Button size="lg" className="gap-1">
                      Try Legal Assistant <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button size="lg" variant="outline">
                      Community Hub
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scale className="h-24 w-24 text-primary opacity-20" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-background/0 p-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-xl">Legal Answer Assistant</h3>
                      <p className="text-sm text-gray-500">
                        Get instant answers to your legal questions in plain language
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  DharmaSetu empowers individuals, communities, and legal professionals
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Multilingual Interface",
                  description: "Regional language support for better accessibility",
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "AI-based Analysis",
                  description: "Summarization, prediction, and verification",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Citizen-friendly UX",
                  description: "Guided workflows for easy navigation",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "Secure Document Handling",
                  description: "Protection for sensitive legal documents",
                },
                {
                  icon: <Scale className="h-10 w-10 text-primary" />,
                  title: "Open-source Compatible",
                  description: "Customizable for civic bodies and NGOs",
                },
                {
                  icon: <ArrowRight className="h-10 w-10 text-primary" />,
                  title: "Democratized Access",
                  description: "Justice and information for all citizens",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Core Modules</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tools to make legal knowledge accessible
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 mt-12">
              {[
                {
                  title: "Legal Answer Assistant",
                  description:
                    "An intuitive AI chatbot that explains legal rights, civic duties, and government procedures in plain language — customized to the user's regional dialect.",
                  module: 1,
                },
                {
                  title: "Legal Language Simplifier",
                  description:
                    "A powerful legal document summarization tool that deconstructs dense legal texts into easy-to-understand summaries.",
                  module: 2,
                },
                {
                  title: "Community Issue and Petition Hub",
                  description:
                    "A citizen engagement dashboard for raising grievances, tracking local issues, initiating or signing petitions, and monitoring real-time government initiative updates.",
                  path: "/community",
                },
                {
                  title: "Case Predictor and Resolution Tool",
                  description:
                    "An AI-driven case analysis engine that suggests probable outcomes and solutions based on historical data.",
                  module: 4,
                },
                {
                  title: "Contract Review and Compliance Checker",
                  description:
                    "A smart compliance tool that automatically analyzes contracts for potential risks, missing clauses, and regulatory mismatches.",
                  module: 5,
                },
              ].map((module, index) => (
                <div key={index} className="flex flex-col space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  <p className="text-gray-500">{module.description}</p>
                  <div className="mt-4">
                    <Link href={module.path || `/app?module=${module.module}`}>
                      <Button variant="outline" size="sm">
                        Try Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DharmaSetu</span>
            </div>
            <p className="text-sm text-gray-500">
              Democratizing legal knowledge and civic governance for all citizens.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-gray-500 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#modules" className="text-gray-500 hover:text-gray-900">
                    Modules
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/resources" className="text-gray-500 hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/resources#help" className="text-gray-500 hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about#privacy" className="text-gray-500 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/about#terms" className="text-gray-500 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© 2025 DharmaSetu. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
