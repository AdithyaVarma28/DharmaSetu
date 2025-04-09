import Link from "next/link"
import { MessageSquare, FileText, Scale, FileCheck } from "lucide-react"

interface AppSidebarProps {
  activeModule?: string
}

export function AppSidebar({ activeModule }: AppSidebarProps) {
  return (
    <aside className="fixed left-0 top-16 z-10 h-[calc(100vh-64px)] w-[70px] border-r bg-sidebar shadow-sm">
      <div className="flex h-full flex-col items-center py-4 overflow-y-auto scrollbar-hide">
        <nav className="flex flex-col items-center space-y-6 w-full">
          <Link
            href="/app?module=1"
            className={`w-full flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeModule === "legal-assistant" 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1 text-center leading-tight">Legal Assistant</span>
          </Link>

          <Link
            href="/app?module=2"
            className={`w-full flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeModule === "language-simplifier" 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1 text-center leading-tight">Language Simplifier</span>
          </Link>

          <Link
            href="/app?module=4"
            className={`w-full flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeModule === "case-predictor" 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <Scale className="h-5 w-5" />
            <span className="text-xs mt-1 text-center leading-tight">Case Predictor</span>
          </Link>

          <Link
            href="/app?module=5"
            className={`w-full flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeModule === "contract-review" 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <FileCheck className="h-5 w-5" />
            <span className="text-xs mt-1 text-center leading-tight">Contract Review</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
