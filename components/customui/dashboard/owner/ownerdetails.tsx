'use client';
import React from 'react';
import { UserDetails } from "@/lib/definitions";
import {
  User,
  Package,
  CircleDollarSign,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  LineChart,
  Search,
  Bell,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Orders from "@/components/customui/dashboard/owner/orderlist";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



interface OwnerProps {
  data: UserDetails;
}



const StatCard = ({
  title,
  value,
  comparison,
  trend,
  icon: Icon
}: {
  title: string;
  value: string | number;
  comparison?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ElementType;
}) => (
  <Card className="bg-white border ">
    <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
            <TrendingUp className={`h-4 w-4 ${!trend.isPositive && 'rotate-180'}`} />
            <span className="ml-1">{trend.value}%</span>
          </div>
        )}
      </div>
      {comparison && (
        <p className="text-xs text-gray-500 mt-1">
          {comparison}
        </p>
      )}
    </CardContent>
  </Card>
);


export default function OwnerDetails({ data }: OwnerProps) {

  const router = useRouter();

  const totalMachines = data.ownedMachines?.length || 0;
  const availableMachines = data.ownedMachines?.filter(m => m.isAvailable).length || 0;
  const occupancyRate = totalMachines ? ((totalMachines - availableMachines) / totalMachines) * 100 : 0;
  const monthlyRevenue = 0;

  const handleAddMachine = () => {
    router.push(`/machines/add`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Track your sales and performance strategy</p>
        </div>
        <div className="flex items-center space-x-4">

          <Button className="p-2 hover:bg-gray-100 bg-secondary ">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Button onClick={handleAddMachine}>
            <Plus className="h-4 w-4 mr-2" />
            Add Machine
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Machines"
          value={totalMachines}
          comparison="All machines in your fleet"
          icon={Package}
        />
        <StatCard
          title="Available Machines"
          value={availableMachines}
          comparison={`${totalMachines - availableMachines} machines booked`}
          icon={Users}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate.toFixed(1)}%`}
          trend={{
            value: 12.5,
            isPositive: true
          }}
          icon={Calendar}
        />
        <StatCard
          title="Monthly Revenue"
          value={`KES ${monthlyRevenue.toLocaleString()}`}
          trend={{
            value: 8.2,
            isPositive: true
          }}
          icon={CircleDollarSign}
        />
      </div>



      <Orders userDetails={data} ownerId={String(data.id)} />
    </div>
  );
}