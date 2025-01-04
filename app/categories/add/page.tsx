'use client';
import { CategoryRequest } from "@/lib/definitions";
import { categoryAPI } from "@/lib/service";
import CategoryForm from "@/components/customui/categories/categoryform";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateCategory() {
    const router = useRouter();
    const queryClient = useQueryClient();

    // Create mutation for category creation
    const { mutate: createNewCategory, isPending } = useMutation({
        mutationFn: (data: CategoryRequest) => categoryAPI.createCategory(data),
        onSuccess: () => {
            // Show success toast
            toast({
                title: "Category created successfully",
                description: "A category has been created"
            });

            // Invalidate and refetch categories query
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            // Redirect to categories page
            router.push('/categories');
        },
        onError: (error) => {
            // Show error toast
            toast({
                title: "Creation failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        }
    });

    const handleCreateCategory = async (data: CategoryRequest) => {
        createNewCategory(data);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Header Container with Flexbox */}
            <div className="flex items-start justify-between mb-8">
                {/* Text Content */}
                <div className="text-center flex-1"> {/* flex-1 helps center the text */}
                    <h1 className="text-2xl font-bold">Add a new category</h1>
                    <p className="text-muted-foreground">
                        Give a good description for users to better understand
                    </p>
                </div>

                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 ml-4" // ml-4 adds some spacing from the header
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            {/* Form */}
            <CategoryForm
                onSubmit={handleCreateCategory}
                isLoading={isPending}
            />
        </div>
    );
}