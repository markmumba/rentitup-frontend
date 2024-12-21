'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export function OAuthRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const { mutate: handleOAuthRedirect, isPending } = useMutation({
    mutationFn: async () => {
      const token = searchParams.get('token');
      const role = searchParams.get('role') || 'CUSTOMER';
      const error = searchParams.get('error');

      if (error) {
        throw new Error(error);
      }

      if (!token) {
        throw new Error('Authentication failed: No token received');
      }

      // Using Zustand store methods
      useAuthStore.getState().setToken(token);
      useAuthStore.getState().setRole(role);

      return { token, role };
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully"
      });
      
      // Small delay to ensure toast is visible
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });

      // Delay redirect to show the error state
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  });

  useEffect(() => {
    handleOAuthRedirect();
  }, [handleOAuthRedirect, searchParams]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-[300px]">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              {error}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[300px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">
            {isPending ? 'Completing your sign in...' : 'Redirecting to dashboard...'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}