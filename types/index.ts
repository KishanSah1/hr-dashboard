export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  image: string
  department: string
  rating: number
  bio: string
  projects: Project[]
  feedback: Feedback[]
  performanceHistory: PerformanceRecord[]
}

export interface Project {
  id: string
  name: string
  status: "active" | "completed" | "pending"
  progress: number
}

export interface Feedback {
  id: string
  from: string
  message: string
  date: string
  rating: number
}

export interface PerformanceRecord {
  id: string
  period: string
  rating: number
  goals: string[]
  achievements: string[]
}

export interface CreateUserData {
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  department: string
}
