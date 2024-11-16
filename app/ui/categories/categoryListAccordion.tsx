import { CategoryListResponse } from "@/app/lib/definitions"
import { isAdmin } from "@/app/lib/service";
import { shortenDescription } from "@/app/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



export function CategoryAccordion({ category }: { category: CategoryListResponse }) {
    const router = useRouter();
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
                                {isAdmin() &&  <Button
                                    onClick={() => router.push(`/categories/${category.id}/edit`)}
                                    variant="secondary"
                                >
                                    Update Category
                                </Button>}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}