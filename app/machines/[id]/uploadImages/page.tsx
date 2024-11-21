'use client';
import { uploadMachineImages } from "@/app/lib/service";
import { owner } from "@/app/lib/utils"
import { ProtectedRoute } from "@/app/protector"
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadIcon } from "lucide-react";
import { useMachineStore } from "@/app/lib/store";

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
    const machineId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { isAddingImages, setIsAddingImages } = useMachineStore();

    function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setImageFiles(Array.from(event.target.files));
        }
    }

    async function handleImageUpload() {
        try {
            setIsLoading(true);
            const formData = new FormData();
            imageFiles.forEach(file => {
                formData.append('images', file);
            });

            await uploadMachineImages(machineId, formData);

            toast({
                title: "Images Uploaded",
                description: "Machine images added successfully"
            });

            router.push('/dashboard/profile');
        } catch (error) {
            toast({
                title: "Image Upload Failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        if (!isAddingImages) {
            router.push("/dashboard/profile")
        }
        return () => setIsAddingImages(false);

    }, [isAddingImages, router, setIsAddingImages]);

    if (!isAddingImages) return null;
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
                            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-primary  py-10 hover:file:bg-primary/20"
                        />

                        {imageFiles.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                                Selected files: {imageFiles.map(file => file.name).join(', ')}
                            </div>
                        )}

                        <Button
                            onClick={handleImageUpload}
                            disabled={imageFiles.length === 0 || isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Uploading...' : (
                                <>
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                    Upload Images
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}