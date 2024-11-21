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
import { CategoryListResponse, MachineRequest } from "@/app/lib/definitions";
import { getAllCategories, getLoggedUserProfile, getMachineConditions } from "@/app/lib/service";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    const [categoriesList, setCategoriesList] = useState<CategoryListResponse[]>([]);
    const [ownerId, setOwnerId] = useState<string | null>(null);
    const [machineConditions, setMachineConditions] = useState<string[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true);
    const [isLoadingOwner, setIsLoadingOwner] = useState(true);
    const [isLoadingConditions, setIsLoadingConditions] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function getCategories() {
        try {
            setIsLoadingCategory(true);
            setError(null);
            const data = await getAllCategories();
            setCategoriesList(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load categories');
            toast({
                title: "Error",
                description: "Failed to load categories",
                variant: "destructive",
            });
        } finally {
            setIsLoadingCategory(false);
        }
    }

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

    useEffect(() => {
        getCategories();
        async function fetchUserId() {
            try {
                setIsLoadingOwner(true);
                const response = await getLoggedUserProfile();
                const userIdString = String(response.id);
                setOwnerId(userIdString);
                form.setValue('ownerId', userIdString);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load user profile');
                toast({
                    title: "Error",
                    description: "Failed to load user profile",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingOwner(false);
            }
        }

        async function getConditions() {
            try {
                setIsLoadingConditions(true);
                const response = await getMachineConditions();
                setMachineConditions(response);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to get conditions');
                toast({
                    title: "Error",
                    description: "Failed to get conditions",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingConditions(false);
            }
        }

        fetchUserId();
        getConditions();
    }, [form]);

    function handleSubmitForm(values: z.infer<typeof machineSchema>) {
        // Convert numeric values to strings if needed
        const submissionData: MachineRequest = {
            ...values,
            basePrice: values.basePrice,
            categoryId: values.categoryId,
            ownerId: values.ownerId
        };
        onSubmit(submissionData);
    }

    if (isLoadingCategory || isLoadingOwner || isLoadingConditions) {
        return <div>Loading...</div>;
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