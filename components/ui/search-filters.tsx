"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import { departments } from "@/lib/utils"
import { Search, Filter, X } from "lucide-react"

export function SearchFilters() {
  const {
    searchQuery,
    selectedDepartments,
    selectedRatings,
    setSearchQuery,
    setSelectedDepartments,
    setSelectedRatings,
  } = useAppStore()

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department])
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating])
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDepartments([])
    setSelectedRatings([])
  }

  const hasActiveFilters = searchQuery || selectedDepartments.length > 0 || selectedRatings.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Department
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={selectedDepartments.includes(department)}
                  onCheckedChange={(checked) => handleDepartmentChange(department, checked)}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Rating
                {selectedRatings.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedRatings.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                >
                  {rating} Star{rating !== 1 ? "s" : ""}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((department) => (
            <Badge key={department} variant="secondary" className="gap-1">
              {department}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleDepartmentChange(department, false)} />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="gap-1">
              {rating} Star{rating !== 1 ? "s" : ""}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleRatingChange(rating, false)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
