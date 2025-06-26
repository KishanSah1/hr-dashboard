"use client"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Moon, Sun, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Users },
  { name: "Bookmarks", href: "/bookmarks", icon: Users },
  { name: "Analytics", href: "/analytics", icon: Users },
]

export function Header() {
  const { theme, toggleTheme } = useAppStore()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-bold text-xl">HR Dashboard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  )
}
