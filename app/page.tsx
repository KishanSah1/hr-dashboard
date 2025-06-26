"use client"

import { UserCard } from "@/components/ui/user-card"
import { SearchFilters } from "@/components/ui/search-filters"
import { Pagination } from "@/components/ui/pagination"
import { CreateUserModal } from "@/components/ui/create-user-modal"
import { useUsers } from "@/hooks/useUsers"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const { users, totalUsers, totalPages, currentPage, isLoading } = useUsers()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-20 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">Manage and track employee performance</p>
        </div>
        <CreateUserModal />
      </div>

      <SearchFilters />

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {users.length} of {totalUsers} employees
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No employees found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </div>
  )
}
