import { BookingListResponse, UserDetails } from "@/app/lib/definitions";
import { getBookingsByUser, getBookingsForOwner } from "@/app/lib/service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Building2, CircleDollarSign, Table, Truck, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

export function Orders({ ownerId , userDetails}: { ownerId: string ,userDetails:UserDetails}) {
  const [bookingList, setBookingList] = useState<BookingListResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  async function getBookingList() {
    try {
      setIsLoading(true);
      const response = await getBookingsForOwner(ownerId);
      setBookingList(response);
      console.log(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to get booking list');
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBookingList();
    console.log(userDetails);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6</div>
          <p className="text-xs text-muted-foreground">
            Across various categories
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$10,800</div>
          <p className="text-xs text-muted-foreground">
            Base price per day
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Machines</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userDetails.ownedMachines.length}</div>
          <p className="text-xs text-muted-foreground">
            Ready for rental
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance Required</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            All machines operational
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Machine Inventory</CardTitle>
          <CardDescription>
            Overview of all your registered machines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDetails.ownedMachines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>
                      <Badge variant={machine.condition === 'EXCELLENT' ? 'default' : 'secondary'}>
                        {machine.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>${machine.basePrice}/day</TableCell>
                    <TableCell>
                      <Badge variant={machine.isAvailable ? 'success' : 'destructive'}>
                        {machine.isAvailable ? 'Available' : 'Booked'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {!isLoading && bookingList.length > 0 && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Overview of recent machine bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking code</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingList.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.bookingCode}</TableCell>
                      <TableCell>{booking.startDate}</TableCell>
                      <TableCell>{booking.endDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === 'CONFIRMED' ? 'success' :
                          booking.status === 'PENDING' ? 'destructive' : 'default'
                        }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
