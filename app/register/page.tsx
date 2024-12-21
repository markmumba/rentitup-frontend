'use client'
import { useState } from "react";
import { registerUser } from "../../lib/service";
import { RegistrationForm } from "@/components/custom-ui/registration";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { RegisterRequest } from "../../lib/definitions";


export default function Registration() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegistration(data: RegisterRequest) {
        try {
            setIsLoading(true)
            const response = registerUser(data);

            toast({
                title: "Registration successful",
                description: "You can now login to your account"
            })

            router.push('/login')

        } catch (error) {
            toast({
                title: "Registration failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <>
            <div className="container mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Create an Account with us</h1>
                    <p className="text-muted-foreground">
                        Fill in your details to create your account
                    </p>
                </div>

                <RegistrationForm
                    onSubmit={handleRegistration}
                    isLoading={isLoading}
                />
            </div>
        </>
    )

}