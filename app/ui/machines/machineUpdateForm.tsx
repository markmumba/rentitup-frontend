import { CategoryListResponse, MachineImageResponse, MachineResponse, MachineUpdateRequest } from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { deleteMachineImage } from "@/app/lib/service";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const machineUpdateSchema = z.object({
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
});

export default function MachineUpdateForm({
    onSubmit,
    machine,
    machineConditions,
    categoriesList,
    isLoadingUpdate,
    isLoadingMachine
}: {
    onSubmit: (data: MachineUpdateRequest) => void;
    machine: MachineResponse;
    machineConditions: string[];
    categoriesList: CategoryListResponse[]
    isLoadingUpdate: boolean;
    isLoadingMachine: boolean;
}) {

    const router = useRouter();
    const [existingImages, setExistingImages] = useState<MachineImageResponse[]>(
        machine.machineImages || []
    );
    const [error, setError] = useState<string | null>();

    const form = useForm<z.infer<typeof machineUpdateSchema>>({
        resolver: zodResolver(machineUpdateSchema),
        defaultValues: {
            name: machine.name || "",
            basePrice: machine.basePrice?.toString() || "0",
            condition: machine.condition || "GOOD",
            specification: machine.specification || "",
            categoryId: machine.categoryId.toString() || "0",
        }
    });


    function handleSubmitForm(values: z.infer<typeof machineUpdateSchema>) {
        console.log(values)
        onSubmit(values);
    }




    const handleAddImages = () => {
        const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/machines/${String(machine.id)}/uploadImages?redirect=${currentPath}`);
    }

    const removeExistingImage = async (imageId: string) => {
        try {
            await deleteMachineImage(String(machine.id), String(imageId));
            setExistingImages(prev => prev.filter(img => img.id !== imageId));
            toast({
                title: "Success",
                description: "Image deleted successfully",
                variant: "default",
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete image');
            toast({
                title: "Error",
                description: "Failed to delete image",
                variant: "destructive",
            });
        }
    };


    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Machine Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoadingUpdate}
                                            placeholder={machine.name}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Current name: {machine.name}
                                    </FormDescription>
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
                                            disabled={isLoadingUpdate}
                                            placeholder={machine.description}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Current description: {machine.description}
                                    </FormDescription>
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
                                            type="number"
                                            step="0.01"
                                            disabled={isLoadingUpdate}
                                            placeholder={machine.basePrice}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Current price: {machine.basePrice}
                                    </FormDescription>
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
                                        <Textarea
                                            disabled={isLoadingUpdate}
                                            placeholder={machine.specification}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Current specifications: {machine.specification}
                                    </FormDescription>
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

                        <div className="space-y-4">
                            <FormLabel>Machine Images</FormLabel>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <>
                                    <h4 className="text-sm font-medium">Current Images</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {existingImages.map((image) => (
                                            <div key={`existing-${image.id}`} className="relative">
                                                <img
                                                    src={image.url}
                                                    alt={`Machine image ${image.id}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                {image.isPrimary && (
                                                    <span className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                                                        Primary
                                                    </span>
                                                )}
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-1 right-1"
                                                    onClick={() => removeExistingImage(image.id)}
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}


                            <Button onClick={handleAddImages}>
                                Add images
                            </Button>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                disabled={isLoadingUpdate}
                            >
                                {isLoadingUpdate ? 'Updating...' : 'Update Machine'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}