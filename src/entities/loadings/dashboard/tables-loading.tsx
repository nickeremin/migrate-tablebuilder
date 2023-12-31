import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Card } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function AllTeamTablesLoading() {
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="flex gap-3">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-11 w-[88px]" />
        <Skeleton className="h-11 w-11 sm:w-[140px]" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="-mt-2 border-b pb-5 sm:-mt-4">
          <Skeleton className="h-9 w-32" />
          <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 1 }, (_, index) => index).map((_, i) => (
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
        </div>

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
      </div>
    </div>
  )
}

export default AllTeamTablesLoading
