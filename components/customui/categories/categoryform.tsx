import { CategoryRequest, CategoryResponse } from "@/lib/definitions";
import {  categoryAPI, isAdmin, isAuthenticated } from "@/lib/service";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query";


const categorySchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    description: z.string().min(1, "Description is required").max(500, "Description is too long"),
    priceCalculationType: z.string().min(1, "Price calculation type is required")
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
    const { 
        data: priceCalculationTypes = [], 
        isError,
        error
    } = useQuery({
        queryKey: ['priceCalculationTypes'], 
        queryFn: () => categoryAPI.getPriceCalculationTypes(),
        retry: 2,
        staleTime: 5 * 60 * 1000, 
    });

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || "",
            description: category?.description || "",
            priceCalculationType: category?.priceCalculationType || ""
        }
    });

    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
                description: category.description,
                priceCalculationType: category.priceCalculationType
            });
        }
    }, [category, form, priceCalculationTypes]);

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

                <FormField
                    control={form.control}
                    name="priceCalculationType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price Calculation Type</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a price calculation type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {/* Add loading and error states */}
                                    {isError ? (
                                        <SelectItem value="">
                                            Error loading types: {error instanceof Error ? error.message : 'Unknown error'}
                                        </SelectItem>
                                    ) : (
                                        priceCalculationTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
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