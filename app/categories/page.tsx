
'use client';
import { categoryAPI, isAdmin } from "@/lib/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CategoryAccordion from "@/components/customui/categories/categorylistaccordion";

export default function Categories() {
    const router = useRouter();

    // Query for categories
    const {
        data: categoriesList,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryAPI.getAllCategories,
        retry: 2, // Retry failed requests up to 2 times
    });

    const handleAddCategory = () => {
        router.push("/categories/add");
    };

    // Error component
    if (isError) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error instanceof Error ? error.message : 'Failed to load categories'}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="ml-2"
                        >
                            Try Again
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Card>
                {isAdmin() && (
                    <Button
                        variant="secondary"
                        onClick={handleAddCategory}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </Button>
                )}
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Choose by Category
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-3">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <div className="pl-4 space-y-2">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-8 w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : categoriesList?.length ? (
                        // Categories list
                        categoriesList.map((category) => (
                            <CategoryAccordion
                                key={category.id}
                                category={category}
                            />
                        ))
                    ) : (
                        // Empty state
                        <Alert>
                            <AlertTitle>No Categories Found</AlertTitle>
                            <AlertDescription>
                                No categories are currently available.
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => refetch()}
                                    className="ml-2"
                                >
                                    Refresh
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}