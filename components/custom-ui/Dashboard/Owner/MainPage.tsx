'use client';

import { UserDetails } from "@/lib/definitions";
import { Orders } from "./orderList";
import { User } from "lucide-react";

interface OwnerProps {
  data: UserDetails;
}

export default function OwnerDetails({ data }: OwnerProps) {
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
            Manage your machine bookings and view your history
          </p>
        </div>
      </div>
      <Orders userDetails={data} ownerId={String(data.id)} />
    </div>
  );
}
