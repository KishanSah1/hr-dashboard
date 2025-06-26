import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
  className?: string
}

export function Rating({ rating, maxRating = 5, size = "md", showNumber = false, className }: RatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}
