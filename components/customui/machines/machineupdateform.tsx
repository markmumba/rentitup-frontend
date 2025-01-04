import { CategoryListResponse, MachineImageResponse, MachineResponse, MachineUpdateRequest } from "@/lib/definitions";
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineAPI } from "@/lib/service";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


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
    categoriesList: CategoryListResponse[];
    isLoadingUpdate: boolean;
    isLoadingMachine: boolean;
}) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: deleteImage, isPending: isDeletingImage } = useMutation({
        mutationFn: (imageId: string) => machineAPI.images.delete(String(machine.id), imageId),
        onMutate: async (imageId) => {
            await queryClient.cancelQueries({ queryKey: ['machine', machine.id] });
            const previousMachine = queryClient.getQueryData(['machine', machine.id]);
            queryClient.setQueryData(['machine', machine.id], (old: any) => ({
                ...old,
                machineImages: old.machineImages.filter((img: MachineImageResponse) => img.id !== imageId)
            }));
            return { previousMachine };
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Image deleted successfully",
                variant: "default",
            });
            queryClient.invalidateQueries({ queryKey: ['machine', machine.id] });
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(['machine', machine.id], context?.previousMachine);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete image",
                variant: "destructive",
            });
        }
    });

    const form = useForm<z.infer<typeof machineUpdateSchema>>({
        resolver: zodResolver(machineUpdateSchema),
        defaultValues: {
            name: machine.name || "",
            description: machine.description || "",
            basePrice: machine.basePrice?.toString() || "0",
            condition: machine.condition || "GOOD",
            specification: machine.specification || "",
            categoryId: machine.categoryId.toString() || "0",
        }
    });

    const handleAddImages = () => {
        const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/machines/${String(machine.id)}/upload-images?redirect=${currentPath}`);
    };

    const handleSubmitForm = (values: z.infer<typeof machineUpdateSchema>) => {
        onSubmit(values);
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
                                            placeholder="Enter machine description"
                                            className="min-h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Provide a detailed description of the machine
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
                                            type="text"
                                            disabled={isLoadingUpdate}
                                            placeholder="0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Enter price in decimal format (e.g., 99.99)
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
                                    <FormLabel>Condition</FormLabel>
                                    <Select
                                        disabled={isLoadingUpdate}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select condition" />
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
                                            placeholder="Enter machine specifications"
                                            className="min-h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        List technical specifications and features
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
                                        disabled={isLoadingUpdate}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categoriesList.map((category) => (
                                                <SelectItem 
                                                    key={category.id} 
                                                    value={category.id.toString()}
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

                            {machine.machineImages.length > 0 && (
                                <>
                                    <h4 className="text-sm font-medium">Current Images</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {machine.machineImages.map((image) => (
                                            <div key={`existing-${image.id}`} className="relative">
                                                <Image
                                                    src={image.url}
                                                    alt={`Machine image ${image.id}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                    width={800}
                                                    height={800}
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
                                                    disabled={isDeletingImage}
                                                    onClick={() => deleteImage(image.id)}
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <Button
                                type="button"
                                onClick={handleAddImages}
                            >
                                Add images
                            </Button>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                disabled={isLoadingUpdate || isDeletingImage}
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