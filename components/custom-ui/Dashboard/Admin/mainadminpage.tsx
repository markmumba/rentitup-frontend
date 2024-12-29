'use client';

import { UserDetails } from "@/lib/definitions";
import { Bell, Plus, Search, User } from "lucide-react";
import AllBookings from './bookings';
import { UserList } from "@/components/custom-ui/dashboard/admin/userlist";
import UnverifiedOwners from "@/components/custom-ui/dashboard/admin/unverifiedowners";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AdminProps {
  data: UserDetails;
}


export default function AdminDashboard({ data }: AdminProps) {
  const router = useRouter();

  const handleAddCategory = () => {
    router.push("/categories/add");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
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
        <div className="flex items-center space-x-4">
         
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          <Button
            variant="secondary"
            onClick={handleAddCategory}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>
      <UnverifiedOwners />
      <AllBookings />
      <UserList />
    </div>
  );
}