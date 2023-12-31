import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Card } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function TablesFetching() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => index).map((_, i) => (
        <Card key={i}>
          <AspectRatio ratio={21 / 9}>
            <Skeleton className="h-full rounded-b-none rounded-t-xl border-b" />
          </AspectRatio>
          <div className="flex justify-between p-6">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-5 w-9" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TablesFetching
