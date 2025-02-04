import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CityCardSkeleton() {
    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-24 w-24 rounded-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-16 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                <div className="flex justify-around mt-6">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </CardContent>
        </Card>
    )
}
