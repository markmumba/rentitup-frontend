'use client';
import { UserDetails, UserDetailsList, MaintenanceRecordResponse } from "@/lib/definitions";
import { Bell, Plus, User, Users, ClipboardCheck, Settings, ArrowUpRight, ArrowDownRight} from "lucide-react";
import UnverifiedOwners from "@/components/custom-ui/dashboard/admin/unverifiedowners";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UncheckedMaintenanceRecords from "./uncheckedRecords";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { userAPI, maintenanceAPI } from "@/lib/service";

interface AdminProps {
  data: UserDetails;
}


const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend,
  trendValue 
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}) => {
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="overflow-hidden  border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-baseline space-x-3">
          <div className="text-2xl font-bold">{value}</div>
          {trend && trendValue && (
            <div className={`flex items-center text-sm ${getTrendColor(trend)}`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {trendValue}
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard({ data }: AdminProps) {
  const router = useRouter();

  // Fetch unverified owners
  const { data: unverifiedOwners = [] } = useQuery<UserDetailsList[], Error>({
    queryKey: ['unverifiedOwners'],
    queryFn: userAPI.collectors.getUnverified,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch unchecked maintenance records
  const { data: maintenanceRecords = [] } = useQuery<MaintenanceRecordResponse[], Error>({
    queryKey: ['uncheckedMaintenance'],
    queryFn: maintenanceAPI.getUncheckedMaintenanceRecords,
  });

  // Fetch all users
  const { data: allUsers = [] } = useQuery<UserDetailsList[], Error>({
    queryKey: ['allUsers'],
    queryFn: userAPI.getAllUsers,
  });

  const handleAddCategory = () => {
    router.push("/categories/add");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
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
              Manage your users and system maintenance
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={allUsers.length}
          icon={Users}
          description="All registered users"
        />
        <StatsCard
          title="Unverified Owners"
          value={unverifiedOwners.length}
          icon={ClipboardCheck}
          description="Owners pending verification"
          trend={unverifiedOwners.length > 0 ? "up" : "neutral"}
          trendValue={unverifiedOwners.length > 0 ? "Needs attention" : "All verified"}
        />
        <StatsCard
          title="Pending Maintenance"
          value={maintenanceRecords.length}
          icon={Settings}
          description="Unchecked maintenance records"
          trend={maintenanceRecords.length > 0 ? "up" : "neutral"}
          trendValue={maintenanceRecords.length > 0 ? "Needs review" : "All checked"}
        />
      </div>

      {/* Tables Section */}
      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle>Unchecked Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UncheckedMaintenanceRecords />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle>Unverified Owners</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UnverifiedOwners />
        </CardContent>
      </Card>
    </div>
  );
}