'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from "@/hooks/use-toast";
import { UserDetails } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, User } from "lucide-react";
import { UserList } from "./UserList";
import AllBookings from "./bookings";
import { userAPI } from '@/lib/service';

interface AdminProps {
  data: UserDetails;
}


export default function AdminDetails({data}:AdminProps) {


  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {data.fullName}
          </h1>
          <p className="text-muted-foreground">
            Manage your users and everything
          </p>
        </div>
      </div>
      <AllBookings />
      <UserList />
    </div>
  );
}