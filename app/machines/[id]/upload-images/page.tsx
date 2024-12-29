'use client';
import { machineAPI } from "@/lib/service"; // Assuming this is where your API functions are exported
import { owner } from "@/lib/utils";
import { ProtectedRoute } from "@/app/protector";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadIcon } from "lucide-react";
import { useMachineStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProtectedAddMachineImages() {
    return (
        <ProtectedRoute allowedRoles={owner}>
            <AddMachineImages />
        </ProtectedRoute>
    );
}

function AddMachineImages() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const machineId = params.id as string;

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { isAddingImages, setIsAddingImages } = useMachineStore();

    // Mutation for uploading images
    const { mutate: uploadImages, isPending } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            imageFiles.forEach(file => {
                formData.append('images', file);
            });
            return machineAPI.images.upload(machineId, formData);
        },
        onSuccess: () => {
            toast({
                title: "Images Uploaded",
                description: "Machine images added successfully"
            });

            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['machine', machineId] });
            queryClient.invalidateQueries({ queryKey: ['machineImages', machineId] });

            const redirectUrl = searchParams.get("redirect") || "/dashboard/profile";
            router.push(redirectUrl);
        },
        onError: (error) => {
            toast({
                title: "Image Upload Failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        }
    });

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageFiles(Array.from(event.target.files));
        }
    };

    const handleImageUpload = () => {
        uploadImages();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-6 h-6" />
                        Add Machine Images
                    </CardTitle>
                    <CardDescription>
                        Upload images for your machine
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-primary py-10 hover:file:bg-primary/20"
                        />

                        {imageFiles.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                                Selected files: {imageFiles.map(file => file.name).join(', ')}
                            </div>
                        )}

                        <Button
                            onClick={handleImageUpload}
                            disabled={imageFiles.length === 0 || isPending}
                            className="w-full"
                        >
                            {isPending ? 'Uploading...' : (
                                <>
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                    Upload Images
                                </>
                            )}
                        </Button>
                    </div>
                    {isPending && <p className="text-muted-foreground">This may take a while</p>}
                </CardContent>
            </Card>
        </div>
    );
}