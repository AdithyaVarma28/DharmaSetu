import Link from "next/link"
import { MessageSquare, FileText, Scale, FileCheck } from "lucide-react"

interface AppSidebarProps {
  activeModule?: string
}

export function AppSidebar({ activeModule }: AppSidebarProps) {
  return (
    <div className="w-[60px] border-r bg-gray-100 flex flex-col items-center py-4">
      <div className="flex flex-col items-center space-y-8">
        <Link
          href="/app?module=1"
          className={`w-full flex flex-col items-center justify-center py-3 ${activeModule === "legal-assistant" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          <MessageSquare className="h-6 w-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600 text-center px-1">Legal Assistant</span>
        </Link>

        <Link
          href="/app?module=2"
          className={`w-full flex flex-col items-center justify-center py-3 ${activeModule === "language-simplifier" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          <FileText className="h-6 w-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600 text-center px-1">Language Simplifier</span>
        </Link>

        <Link
          href="/app?module=4"
          className={`w-full flex flex-col items-center justify-center py-3 ${activeModule === "case-predictor" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          <Scale className="h-6 w-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600 text-center px-1">Case Predictor</span>
        </Link>

        <Link
          href="/app?module=5"
          className={`w-full flex flex-col items-center justify-center py-3 ${activeModule === "contract-review" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          <FileCheck className="h-6 w-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600 text-center px-1">Contract Review</span>
        </Link>
      </div>
    </div>
  )
}
