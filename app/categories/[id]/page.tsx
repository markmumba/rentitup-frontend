'use client'
import { categoryAPI } from "@/lib/service"; // Assuming this is where your API functions are exported
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MachineListCard from "@/components/customui/machines/machinelistcard";

export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.id as string;
    const router = useRouter();

    // Query for category details
    const {
        data: category,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => categoryAPI.getCategoryById(categoryId),
        enabled: !!categoryId, // Only run query if categoryId exists
    });

   



    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6 p-6">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[300px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[200px]" />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <Alert variant="destructive" className="m-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error instanceof Error ? error.message : 'Failed to load category'}
                </AlertDescription>
            </Alert>
        );
    }

    // Success state
    return (
        <div className="p-2 space-y-2 ">
            {/* Back Button */}
            <div className="flex justify-end w-full">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>
            {category && (
                <>
                    <div className="space-y-2 mx-10">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {category.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {category.description}
                        </p>
                        <p className="text-muted-foreground">
                            Pricing type:{' '}
                            <Badge variant="secondary">
                                Daily
                            </Badge>
                        </p>
                        <p className="text-muted-foreground">
                            Showing {category.machines.length} verified machines
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.machines.map((machine) => (
                            <MachineListCard key={machine.id} machine={machine} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}