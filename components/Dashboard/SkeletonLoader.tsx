import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonItem = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Skeleton className="h-[200px] w-full rounded-xl" />
    </motion.div>
)

export function SkeletonLoader() {
    return (
        <div className='container px-2 py-4 space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2 space-y-6'>
                    <SkeletonItem />
                    <Card>
                        <CardHeader>
                            <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex-shrink-0">
                                        <Skeleton className="h-20 w-20 rounded-full" />
                                        <Skeleton className="h-4 w-20 mt-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <SkeletonItem />
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle><Skeleton className="h-6 w-1/2" /></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
