"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/ui/rating"
import type { User } from "@/types"
import { Eye, Bookmark, TrendingUp, BookmarkCheck } from "lucide-react"
import { useBookmarks } from "@/hooks/useBookmarks"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { promoteUser } = useAppStore()

  const handlePromote = () => {
    promoteUser(user.id)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Image
              src={user.image || "/placeholder.svg"}
              alt={`${user.firstName} ${user.lastName}`}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  user.rating >= 4 ? "bg-green-500" : user.rating >= 3 ? "bg-yellow-500" : "bg-red-500"
                }`}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {user.department}
              </Badge>
              <span className="text-xs text-muted-foreground">Age {user.age}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Performance</span>
            <Rating rating={user.rating} size="sm" showNumber />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href={`/employee/${user.id}`}>
            <Eye className="w-4 h-4 mr-1" />
            View
          </Link>
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => toggleBookmark(user.id)}
          className={isBookmarked(user.id) ? "text-blue-600 border-blue-600" : ""}
        >
          {isBookmarked(user.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </Button>

        <Button size="sm" variant="outline" onClick={handlePromote} className="text-green-600 hover:text-green-700">
          <TrendingUp className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
