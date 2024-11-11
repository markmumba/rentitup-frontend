'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "../ui/login";
import { loginUser } from "../lib/service";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoginRequest } from "../lib/definitions";
import { useAuthStore } from "../lib/store";




export default function Login() {


    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();

    const setToken = useAuthStore((state) => state.setToken);
    const setRole= useAuthStore((state) => state.setRole);

    async function handleLogin(data: LoginRequest) {
        try {
            setIsLoading(true)
            console.log("this is the login/page.tsx",data)
            const response = await loginUser(data);
            setToken(response.token);
            setRole(response.role);
            toast({
                title: "Login successful",
                description: "Welcome to your homepage"
            })

            const redirectUrl = searchParams.get("redirect") || "/dashboard";  // Default to homepage
            router.push(redirectUrl)


        } catch (error) {
            toast({
                title: "Registration failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally{
            setIsLoading(false)
        }

    }


        return (
            <>
                <div className="container mx-auto py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Log in to your account</h1>
                    </div>

                    <LoginForm
                        onSubmit={handleLogin}
                        isLoading={isLoading}
                    />
                </div>
            </>
        )

}