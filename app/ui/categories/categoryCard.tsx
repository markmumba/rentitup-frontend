import { CategoryListResponse } from "@/app/lib/definitions"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
  


export function CategoryAccordion({category}:{category:CategoryListResponse}) {
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
                            {category.description}
                        </p>
                        <div className="flex justify-end">
                            <Button 
                                onClick={() => router.push(`/categories/${category.id}`)}
                                variant="default"
                            >
                                Browse Category
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        </>
    )
}