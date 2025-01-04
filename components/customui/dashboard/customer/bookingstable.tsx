
import { BookingListResponse } from "@/lib/definitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Calendar, DollarSign, Package, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { bookingAPI } from "@/lib/service";


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

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusColor(status)} font-medium px-3 py-1`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  );
};

const BookingRow = ({ booking }: { booking: BookingListResponse }) => (
  <TableRow 
    key={booking.id}
    className="group hover:bg-slate-50 cursor-pointer transition-colors"
  >
    <TableCell className="font-medium">
      <Link 
        href={`dashboard/bookings/${booking.id}`}
        className="flex items-center space-x-2 hover:text-primary transition-colors"
      >
        <span>{booking.bookingCode}</span>
      </Link>
    </TableCell>
    <TableCell>
      <Link 
        href={`dashboard/bookings/${booking.id}`}
        className="block w-full h-full"
      >
        {format(new Date(booking.startDate), "MMM dd, yyyy")}
      </Link>
    </TableCell>
    <TableCell>
      <Link 
        href={`dashboard/bookings/${booking.id}`}
        className="block w-full h-full"
      >
        {format(new Date(booking.endDate), "MMM dd, yyyy")}
      </Link>
    </TableCell>
    <TableCell>
      <Link 
        href={`dashboard/bookings/${booking.id}`}
        className="block w-full h-full"
      >
        <StatusBadge status={booking.status} />
      </Link>
    </TableCell>
    <TableCell className="text-right font-medium">
      <Link 
        href={`dashboard/bookings/${booking.id}`}
        className="block w-full h-full"
      >
        KES {parseFloat(booking.totalAmount).toLocaleString()}
      </Link>
    </TableCell>
  </TableRow>
);

export function BookingList({ userId }: { userId: string }) {
  const { 
    data: bookingList = [],
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => bookingAPI.getBookingsByUser(userId),
    select: (data) => [...data].sort((a, b) => b.id - a.id), 
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="animate-in fade-in-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Unable to get booking list'}
        </AlertDescription>
      </Alert>
    );
  }

  // Calculate stats
  const totalBookings = bookingList.length;
  const activeBookings = bookingList.filter(b => 
    b.status.toLowerCase() === 'confirmed').length;

  const totalSpent = bookingList.reduce((sum, booking) => 
    sum + parseFloat(booking.totalAmount), 0);
  
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  const lastMonthBookings = bookingList.filter(b => 
    new Date(b.startDate) > lastMonthDate).length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          icon={Package}
          description="All time bookings"
          trend="up"
          trendValue={`+${lastMonthBookings} this month`}
        />
        <StatsCard
          title="Active Bookings"
          value={activeBookings}
          icon={Calendar}
          description="Currently active bookings"
        />
        <StatsCard
          title="Total Spent"
          value={`KES ${totalSpent.toLocaleString()}`}
          icon={DollarSign}
          description="Total amount spent on bookings"
        />
      </div>

      {/* Bookings Table */}
      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Overview of your recent machine bookings (latest first)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {bookingList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No bookings found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start by creating your first machine booking
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Booking Code</TableHead>
                  <TableHead className="font-semibold">Start Date</TableHead>
                  <TableHead className="font-semibold">End Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingList.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

