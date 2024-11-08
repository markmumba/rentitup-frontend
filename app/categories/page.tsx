
'use client';
import { useEffect, useState } from "react"
import { CategoryListResponse } from "../lib/definitions";
import { getAllCategories } from "../lib/service";
import { CategoryAccordion } from "../ui/categories/categoryListAccordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Categories() {

    const [categoriesList, setCategoriesList] = useState<CategoryListResponse[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function getCategories() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getAllCategories();
            setCategoriesList(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getCategories()
    }, []);
    const handleRetry = () => {
        getCategories();
    };
    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRetry}
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
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Choose by Category
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-3">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <div className="pl-4 space-y-2">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-8 w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : categoriesList!.length > 0 ? (
                        categoriesList!.map((category) => (
                            <CategoryAccordion
                                key={category.id}
                                category={category}
                            />
                        ))
                    ) : (
                        <Alert>
                            <AlertTitle>No Categories Found</AlertTitle>
                            <AlertDescription>
                                No categories are currently available.
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRetry}
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
    )
}