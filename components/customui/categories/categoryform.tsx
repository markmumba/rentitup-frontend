import {  CategoryResponse } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {  useEffect } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const categorySchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    description: z.string().min(1, "Description is required").max(500, "Description is too long"),
});

export default function CategoryForm({
    onSubmit,
    isLoading,
    category
}: {
    onSubmit: (data: z.infer<typeof categorySchema>) => void,
    isLoading?: boolean,
    category?: CategoryResponse
}) {
   

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || "",
            description: category?.description || "",
        }
    });

    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
                description: category.description,
            });
        }
    }, [category, form]);

    function handleSubmit(values: z.infer<typeof categorySchema>) {
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter category description" 
                                    className="min-h-[100px]"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : category ? "Update Category" : "Create Category"}
                </Button>
            </form>
        </Form>
    );
}