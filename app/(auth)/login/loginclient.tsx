'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { LoginRequest } from "@/lib/definitions";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/service";
import { LoginForm } from "@/components/custom-ui/common/login";

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      setToken(response.token);
      setRole(response.role);

      toast({
        title: "Login successful",
        description: "Welcome to your homepage"
      });

      const redirectUrl = searchParams.get("redirect") || "/dashboard";
      router.push(redirectUrl);
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  });

  const handleLogin = (data: LoginRequest) => {
    loginMutation(data);
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL_OAUTH}/oauth2/authorization/google`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Log in to your account</h1>
      </div>

      <LoginForm
        onSubmit={handleLogin}
        isLoading={isPending}
      />

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center">
          <hr className="w-1/4 border-t border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="w-1/4 border-t border-gray-300" />
        </div>
        <Button
          variant="outline"
          className="mt-4 max-w-xl"
          onClick={handleGoogleSignUp}
        >
          <Image
            src="/logo.png"
            alt="google logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}