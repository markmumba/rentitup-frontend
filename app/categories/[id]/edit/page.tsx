'use client';
import { CategoryRequest, CategoryResponse } from "@/app/lib/definitions";
import { getCategoryById, updateCategory } from "@/app/lib/service";
import CategoryForm from "@/app/ui/categories/categoryform";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateCategory() {
    const params = useParams();
    const categoryId = params.id as string;
    const router = useRouter();

    const [error, setError] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<CategoryResponse>();

    async function handleUpdateCategory(data: CategoryRequest) {
        try {
            setIsLoading(true);
            const response = await updateCategory(categoryId, data);

            toast({
                title: "Category created successfully",
                description: "A category has been created"
            });

            router.push("/categories")
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }

    async function getCategory() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getCategoryById(categoryId);
            setCategory(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <>
                <>
                    <div className="container mx-auto py-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">Update category </h1>
                            <p className="text-muted-foreground">
                                Give a good description for users to better understand
                            </p>
                        </div>
                        <CategoryForm
                            category={category}
                            onSubmit={handleUpdateCategory}
                            isLoading={isLoading}
                        />
                    </div>
                </>
            </>
        </>
    )
}