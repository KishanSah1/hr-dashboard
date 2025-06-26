"use client"

import { UserCard } from "@/components/ui/user-card"
import { useBookmarks } from "@/hooks/useBookmarks"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

export default function BookmarksPage() {
  const { bookmarkedUsers, bookmarkCount } = useBookmarks()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Bookmarked Employees</h1>
        </div>
        <span className="text-muted-foreground">({bookmarkCount})</span>
      </div>

      {bookmarkedUsers.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-4">
            Start bookmarking employees to keep track of important team members.
          </p>
          <Button asChild>
            <a href="/">Browse Employees</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
