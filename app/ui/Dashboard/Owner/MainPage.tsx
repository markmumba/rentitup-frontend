'use client';
import { getLoggedUserProfile } from "@/app/lib/service";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { UserDetails } from "@/app/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, User } from "lucide-react";
import { Orders } from "./orderList";

export default function OwnerDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    async function fetchUserId() {
      try {
        setIsLoading(true);
        const response = await getLoggedUserProfile();
        setUserDetails(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load user profile');
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserId();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Failed to load user details'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {userDetails.fullName}
          </h1>
          <p className="text-muted-foreground">
            Manage your machine bookings and view your history
          </p>
        </div>
      </div>
      <Orders userDetails={userDetails} ownerId={String(userDetails.id)} />
    </div>
  );
}