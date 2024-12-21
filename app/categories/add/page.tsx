'use client';
import { CategoryRequest } from "@/lib/definitions";
import { categoryAPI} from "@/lib/service";
import CategoryForm from "@/components/custom-ui/categories/categoryform";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Add a new category</h1>
                <p className="text-muted-foreground">
                    Give a good description for users to better understand
                </p>
            </div>

            <CategoryForm
                onSubmit={handleCreateCategory}
                isLoading={isPending}
            />
        </div>
    );
}