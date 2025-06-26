import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, CreateUserData } from "@/types"

interface AppState {
  users: User[]
  bookmarks: number[]
  searchQuery: string
  selectedDepartments: string[]
  selectedRatings: number[]
  currentPage: number
  itemsPerPage: number
  theme: "light" | "dark"

  // Actions
  setUsers: (users: User[]) => void
  addBookmark: (userId: number) => void
  removeBookmark: (userId: number) => void
  setSearchQuery: (query: string) => void
  setSelectedDepartments: (departments: string[]) => void
  setSelectedRatings: (ratings: number[]) => void
  setCurrentPage: (page: number) => void
  toggleTheme: () => void
  createUser: (userData: CreateUserData) => void
  promoteUser: (userId: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [],
      bookmarks: [],
      searchQuery: "",
      selectedDepartments: [],
      selectedRatings: [],
      currentPage: 1,
      itemsPerPage: 8,
      theme: "light",

      setUsers: (users) => set({ users }),

      addBookmark: (userId) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, userId],
        })),

      removeBookmark: (userId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((id) => id !== userId),
        })),

      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      setSelectedDepartments: (departments) =>
        set({
          selectedDepartments: departments,
          currentPage: 1,
        }),

      setSelectedRatings: (ratings) =>
        set({
          selectedRatings: ratings,
          currentPage: 1,
        }),

      setCurrentPage: (page) => set({ currentPage: page }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      createUser: (userData) =>
        set((state) => {
          const newUser: User = {
            id: Date.now(),
            ...userData,
            address: {
              address: "123 Main St",
              city: "New York",
              state: "NY",
              postalCode: "10001",
              country: "USA",
            },
            image: "/placeholder.svg?height=100&width=100",
            rating: getRandomRating(),
            bio: `New team member in ${userData.department}`,
            projects: [],
            feedback: [],
            performanceHistory: [],
          }
          return { users: [...state.users, newUser] }
        }),

      promoteUser: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, rating: Math.min(user.rating + 1, 5) } : user,
          ),
        })),
    }),
    {
      name: "hr-dashboard-storage",
    },
  ),
)

function getRandomRating(): number {
  return Math.floor(Math.random() * 5) + 1
}
