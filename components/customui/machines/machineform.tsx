import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MachineRequest } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryAPI, machineAPI, userAPI } from "@/lib/service";

const machineSchema = z.object({
    name: z.string()
        .min(3, { message: "Machine name must be at least 3 characters long" })
        .max(100, { message: "Machine name must be less than 100 characters" }),
    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must be less than 500 characters" }),
    basePrice: z.string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" })
        .refine(val => parseFloat(val) >= 0, { message: "Base price must be a positive number" }),
    condition: z.string(),
    specification: z.string()
        .min(10, { message: "Specifications must be at least 10 characters long" })
        .max(1000, { message: "Specifications must be less than 1000 characters" }),
    categoryId: z.string()
        .min(1, { message: "Please select a category" }),
    ownerId: z.string()
});

export default function MachineForm(
    { onSubmit, isLoading }:
    { onSubmit: (data: MachineRequest) => void, isLoading?: boolean }
) {
    // Query for categories
    const { 
        data: categoriesList = [], 
        isLoading: isLoadingCategories,
        error: categoriesError 
    } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryAPI.getAllCategories,
    });

    // Query for machine conditions
    const { 
        data: machineConditions = [],
        isLoading: isLoadingConditions,
        error: conditionsError 
    } = useQuery({
        queryKey: ['machineConditions'],
        queryFn: machineAPI.getMachineConditions,
    });

    // Query for user profile
    const { 
        data: userProfile,
        isLoading: isLoadingProfile,
        error: profileError 
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userAPI.getLoggedUserProfile,
    });

    const form = useForm<z.infer<typeof machineSchema>>({
        resolver: zodResolver(machineSchema),
        defaultValues: {
            name: "",
            description: "",
            basePrice: "0",
            condition: "GOOD",
            specification: "",
            categoryId: "",
            ownerId: ""
        }
    });

    // Set owner ID when userProfile is loaded
    if (userProfile?.id && !form.getValues('ownerId')) {
        form.setValue('ownerId', String(userProfile.id));
    }

    const handleSubmitForm = (values: z.infer<typeof machineSchema>) => {
        const submissionData: MachineRequest = {
            ...values,
            basePrice: values.basePrice,
            categoryId: values.categoryId,
            ownerId: values.ownerId
        };
        onSubmit(submissionData);
    };

    // Loading state
    const isPageLoading = isLoadingCategories || isLoadingConditions || isLoadingProfile;
    if (isPageLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }

    // Error state
    const error = categoriesError || conditionsError || profileError;
    if (error) {
        return (
            <div className="text-red-500">
                Error: {error instanceof Error ? error.message : 'An error occurred'}
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Machine Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter machine name" {...field} />
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
                                <Textarea placeholder="Describe the machine" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Base Price</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text" 
                                    placeholder="Enter base price" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormDescription>Enter price with up to two decimal places</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Machine Condition</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select machine condition" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {machineConditions.map((condition) => (
                                        <SelectItem key={condition} value={condition}>
                                            {condition}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="specification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specifications</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter machine specifications" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select machine category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categoriesList.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding Machine..." : "Add Machine"}
                </Button>
            </form>
        </Form>
    );
}