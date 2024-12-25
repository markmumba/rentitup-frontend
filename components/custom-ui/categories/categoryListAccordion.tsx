import { CategoryListResponse } from "@/lib/definitions"
import {  categoryAPI, isAdmin } from "@/lib/service";
import { shortenDescription } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"
import { useState } from "react";



export default function CategoryAccordion({ category }: { category: CategoryListResponse }) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    const handleDeleteCategory = async () => {
        try {
            const response = await categoryAPI.deleteCategory(String(category.id));
            toast({
                title: "Successfully Deleted Category",
                description: response,
                variant: "default"
            })
            window.location.reload();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load user profile');
            toast({
                title: "Deleting Failed",
                description: error as string,
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    }
    if (isLoading) {
        return <>Trying to delete category</>;
    }
    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={category.id.toString()}>
                    <AccordionTrigger className="text-lg font-normal">
                        {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="p-4 space-y-4">
                            <p className="text-muted-foreground">
                                {shortenDescription(category.description)}
                            </p>
                            <div className="flex justify-end space-x-4">
                                <Button
                                    onClick={() => router.push(`/categories/${category.id}`)}
                                    variant="default"
                                >
                                    Browse Category
                                </Button>
                                {isAdmin() &&
                                    <>
                                        <Button
                                            onClick={() => router.push(`/categories/${category.id}/edit`)}
                                            variant="secondary"
                                        >
                                            Update Category
                                        </Button>
                                        <Button
                                            onClick={handleDeleteCategory}
                                            variant="destructive"
                                        >
                                            Delete Category
                                        </Button>
                                    </>
                                }
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}