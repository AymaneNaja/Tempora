import { motion } from "framer-motion"
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorScreenProps {
    error: string;
    onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
    return (
        <div className="container flex items-center justify-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-destructive">
                            <AlertCircle className="h-6 w-6" />
                            <span>Error</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{error}</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={onRetry} className="w-full">
                            Retry
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

