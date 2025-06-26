"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { generateMockData } from "@/lib/utils"
import type { User } from "@/types"

export function useUsers() {
  const { users, setUsers, searchQuery, selectedDepartments, selectedRatings, currentPage, itemsPerPage } =
    useAppStore()

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers()
    }
  }, [users.length])

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users?limit=20")
      const data = await response.json()
      const enhancedUsers = data.users.map((user: any) => generateMockData(user))
      setUsers(enhancedUsers)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      !searchQuery ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(user.department)

    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(user.rating)

    return matchesSearch && matchesDepartment && matchesRating
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    totalPages,
    currentPage,
    isLoading: users.length === 0,
  }
}
