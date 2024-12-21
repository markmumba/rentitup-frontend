'use client';
import { CategoryRequest } from "@/lib/definitions";
import { createCategory, isAdmin, isAuthenticated } from "@/lib/service";
import CategoryForm from "@/components/custom-ui/categories/categoryform";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CreateCategory() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateCategory(data: CategoryRequest) {
        try {
            setIsLoading(true)
            const response = await createCategory(data);

            toast({
                title: "Category created successfully",
                description: "A category has been created"
            });

            router.push('/categories');

        } catch (error) {
            toast({
                title: "Registration failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            <>
                <div className="container mx-auto py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Add a new  category </h1>
                        <p className="text-muted-foreground">
                            Give a good description for users to better understand
                        </p>
                    </div>

                    <CategoryForm
                        onSubmit={handleCreateCategory}
                        isLoading={isLoading}
                    />
                </div>
            </>

        </>
    )
}