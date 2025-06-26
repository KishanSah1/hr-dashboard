import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design", "Legal"]

export function getRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)]
}

export function getRandomRating(): number {
  return Math.floor(Math.random() * 5) + 1
}

export function generateMockData(user: any) {
  const department = getRandomDepartment()
  const rating = getRandomRating()

  return {
    ...user,
    department,
    rating,
    bio: `Experienced professional in ${department} with ${Math.floor(Math.random() * 10) + 1} years of experience. Passionate about delivering high-quality results and collaborating with cross-functional teams.`,
    projects: [
      {
        id: "1",
        name: "Q4 Strategic Initiative",
        status: "active" as const,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: "2",
        name: "Process Optimization",
        status: "completed" as const,
        progress: 100,
      },
    ],
    feedback: [
      {
        id: "1",
        from: "Manager",
        message: "Excellent work on the recent project. Shows great leadership skills.",
        date: "2024-01-15",
        rating: 5,
      },
      {
        id: "2",
        from: "Peer",
        message: "Great team player and always willing to help others.",
        date: "2024-01-10",
        rating: 4,
      },
    ],
    performanceHistory: [
      {
        id: "1",
        period: "Q4 2023",
        rating: rating,
        goals: ["Improve team collaboration", "Complete certification"],
        achievements: ["Led successful project", "Mentored junior staff"],
      },
    ],
  }
}
