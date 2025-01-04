'use client';
import { CategoryRequest } from "@/lib/definitions";
import { categoryAPI } from "@/lib/service"; // Assuming this is where your API functions are exported
import CategoryForm from "@/components/customui/categories/categoryform";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function UpdateCategory() {
    const params = useParams();
    const categoryId = params.id as string;
    const router = useRouter();
    const queryClient = useQueryClient();

    // Query for fetching category details
    const {
        data: category,
        isLoading: isLoadingCategory,
        error: fetchError
    } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => categoryAPI.getCategoryById(categoryId),
        enabled: !!categoryId,
    });

    // Mutation for updating category
    const {
        mutate: updateCategoryMutation,
        isPending: isUpdating
    } = useMutation({
        mutationFn: (data: CategoryRequest) =>
            categoryAPI.updateCategory(categoryId, data),
        onSuccess: () => {
            toast({
                title: "Category updated successfully",
                description: "The category has been updated"
            });

            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category', categoryId] });

            router.push("/categories");
        },
        onError: (error) => {
            toast({
                title: "Update failed",
                description: error instanceof Error ? error.message : 'Failed to update category',
                variant: "destructive",
            });
        }
    });

    // Combined loading state
    const isLoading = isLoadingCategory || isUpdating;

    // Handle form submission
    const handleUpdateCategory = async (data: CategoryRequest) => {
        updateCategoryMutation(data);
    };

    // Show error if initial fetch fails
    if (fetchError) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h2 className="text-red-600">
                        {fetchError.message}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Update category</h1>
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
    );
}