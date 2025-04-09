import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link href="/app" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Legal Assistant
      </Link>
      <Link
        href="/community"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Community Hub
      </Link>
      <Link
        href="/resources"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Resources
      </Link>
      <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        About
      </Link>
    </nav>
  )
}
