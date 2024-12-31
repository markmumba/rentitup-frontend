"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  // Initialize form
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Create mutation for password reset
  const resetPasswordMutation = useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authAPI.resetPassword(data.token, data.password),
    onSuccess: () => {
      toast({
        title: "Password Reset Successful",
        description: "Your password has been successfully reset. Please log in with your new password.",
        variant: "default",
      });
      
      // Delay redirect slightly to ensure toast is visible
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError: (error) => {
      toast({
        title: "Password Reset Failed",
        description: error instanceof Error 
          ? error.message 
          : "Failed to reset password. Please request a new reset link.",
        variant: "destructive",
      });
    },
  });

  // Check for token on mount
  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Reset Link",
        description: "This password reset link is invalid or has expired. Please request a new one.",
        variant: "destructive",
      });
      
      // Delay redirect to show the error message
      setTimeout(() => {
        router.push("/forgot-password");
      }, 2000);
    }
  }, [token, router]);

  // Handle form submission
  const onSubmit = (values: ResetPasswordSchema) => {
    if (!token) return;

    resetPasswordMutation.mutate({
      token,
      password: values.password,
    });
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Invalid or expired reset link. Redirecting to password reset request page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter new password"
                        type="password"
                        disabled={resetPasswordMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm new password"
                        type="password"
                        disabled={resetPasswordMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}