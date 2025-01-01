// app/verification/verification-client.tsx
'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authAPI } from "@/lib/service";
import { Alert, AlertDescription } from "@/components/ui/alert";

const verificationSchema = z.object({
  nationalIdNumber: z
    .string()
    .min(5, "National ID number must be at least 5 characters")
    .max(50, "National ID number must not exceed 50 characters"),
});

type VerificationSchema = z.infer<typeof verificationSchema>;

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function VerificationClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const registrationId = searchParams.get("registrationId");

  const [verificationImage, setVerificationImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<VerificationSchema>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      nationalIdNumber: "",
    }
  });

  const { mutate: uploadVerification, isPending } = useMutation({
    mutationFn: async (values: { nationalId: string; image: File }) => {
      const formData = new FormData();
      formData.append('file', values.image);
      formData.append('registrationId', registrationId || '');
      formData.append('nationalId', values.nationalId);

      return authAPI.uploadVerification(registrationId || '', formData);
    },
    onSuccess: () => {
      toast({
        title: "Verification Submitted Successfully",
        description: "We'll review your documents and notify you by email.",
      });
      
      form.reset();
      handleClearImage();
      
      // Add small delay before redirect
      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: "Verification Failed",
        description: error instanceof Error 
          ? error.message 
          : "Please check your information and try again",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG, PNG, or WebP image",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setVerificationImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleClearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setVerificationImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById('verification-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = (values: VerificationSchema) => {
    if (!verificationImage) {
      toast({
        title: "Image Required",
        description: "Please select a verification image",
        variant: "destructive",
      });
      return;
    }

    uploadVerification({
      nationalId: values.nationalIdNumber,
      image: verificationImage
    });
  };

  if (!registrationId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>
                Invalid registration ID. Please go through the registration process again.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full mt-4"
              onClick={() => router.push('/register')}
            >
              Return to Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Owner Verification</h2>
        <p className="text-muted-foreground">
          We need to verify your identity as a Owner. Please follow the instructions below.
        </p>
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">
            Please upload an image showing your national ID next to your face.
            Ensure the ID is beside your face, not in front, and the image is clear
            enough to read the ID details.
          </p>
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload Verification Image</CardTitle>
          <CardDescription>
            Please provide a clear image of your national ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onChange={handleFileChange}
                    className="hidden"
                    id="verification-image"
                  />
                  
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative w-full h-48">
                        <Image 
                          src={imagePreview} 
                          alt="ID Verification" 
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleClearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="verification-image"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload your verification image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, or WebP (max 5MB)
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="nationalIdNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your National ID"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Submit Verification"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}