import { useAppStore } from "@/lib/store"
import type { User } from "@/types"

export function useBookmarks() {
  const { users, bookmarks, addBookmark, removeBookmark } = useAppStore()

  const bookmarkedUsers = users.filter((user: User) => bookmarks.includes(user.id))

  const isBookmarked = (userId: number) => bookmarks.includes(userId)

  const toggleBookmark = (userId: number) => {
    if (isBookmarked(userId)) {
      removeBookmark(userId)
    } else {
      addBookmark(userId)
    }
  }

  return {
    bookmarkedUsers,
    isBookmarked,
    toggleBookmark,
    bookmarkCount: bookmarks.length,
  }
}
