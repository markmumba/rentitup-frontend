'use client';

import { UserDetails } from "@/lib/definitions";
import {  User } from "lucide-react";
import { BookingList } from "./bookingstable";

interface CustomerProps {
  data: UserDetails;
}

export default function CustomerDetails({ data }: CustomerProps) {
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
      <BookingList userId={String(data.id)} />
    </div>
  );
}
