'use client';

import { UserDetails } from "@/lib/definitions";
import {  User } from "lucide-react";
import AllBookings from './bookings';
// @ts-ignore
import {UserList} from "@/components/custom-ui/dashboard/admin/userlist";

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
      <UserList/>
    </div>
  );
}