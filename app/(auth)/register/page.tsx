'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { RegisterRequest, UserDetails } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/service";
import { RegistrationForm } from "@/components/custom-ui/common/registration";

export default function Registration() {
    const router = useRouter()

    const { mutate: registerUserMutation, isPending } = useMutation({
        mutationFn: authAPI.register,
        onSuccess: (response) => {
            if (!response.verified) {
                toast({
                    title: "Registration successful",
                    description: "Add your verification Image "
                });
                router.push(`/verification?registrationId=${response.registrationId}`);
            } else {
                toast({
                    title: "Registration successful",
                    description: "You can now login to your account"
                });
                router.push('/login');
            }
        },
        onError: (error: Error) => {
            toast({
                title: "Registration failed",
                description: error.message || "Please try again later",
                variant: "destructive",
            });
        }
    });

    const handleRegistration = (data: RegisterRequest) => {
        registerUserMutation(data);
    };

    const handleGoogleSignUp = () => {
        // Redirect to backend OAuth2 endpoint
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL_OAUTH}/oauth2/authorization/google`;
    }

    return (
        <>

            <div className="container mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Create an Account to continue</h1>
                    <p className="text-muted-foreground">
                        Fill in your details to create your account
                    </p>
                </div>
                <div className="mt-4 mx-auto  text-center">
                    <div className="rounded-md border  border-muted bg-muted/10 p-4 text-sm">
                        <p className="text-foreground">
                            <span className="font-medium">Notice:</span> Only customers should use the Google account for registration.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="mt-4 max-w-xl"
                        onClick={handleGoogleSignUp}
                    >
                        <Image src="/logo.png" alt="google logo" width={20} height={20} />
                        Sign up with Google
                    </Button>
                    <div className="flex items-center justify-center mt-4">
                        <hr className="w-1/4 border-t border-gray-300" />
                        <span className="mx-4 text-gray-500">OR</span>
                        <hr className="w-1/4 border-t border-gray-300" />
                    </div>
                </div>
                <RegistrationForm
                    onSubmit={handleRegistration}
                    isLoading={isPending}
                />

            </div>
        </>
    )
}