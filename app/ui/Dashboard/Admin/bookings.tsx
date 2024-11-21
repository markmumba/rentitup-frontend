import { getAllBookings } from "@/app/lib/service";
import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Calendar, DollarSign, Clock, X, Plus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface BookingListResponse {
    id: number;
    bookingCode: string;
    startDate: string;
    endDate: string;
    status: string;
    totalAmount: string;
}

const BookingModal = ({ booking, isOpen, onClose }: {
    booking: BookingListResponse;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle>Booking Details</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Booking Code</label>
                                <p className="mt-1 font-mono">{booking.bookingCode}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <Badge variant={
                                        booking.status.toLowerCase() === 'confirmed' ? 'default' :
                                            booking.status.toLowerCase() === 'pending' ? 'secondary' :
                                                booking.status.toLowerCase() === 'cancelled' ? 'destructive' :
                                                    'outline'
                                    }>
                                        {booking.status}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                                <p className="mt-1 font-medium">${booking.totalAmount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                                <p className="mt-1">{new Date(booking.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">End Date</label>
                                <p className="mt-1">{new Date(booking.endDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                                <p className="mt-1">
                                    {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    </Dialog>
);

export default function AllBookings() {
    const router = useRouter();
    const [allBookings, setAllBookings] = useState<BookingListResponse[]>();
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>();
    const [selectedBooking, setSelectedBooking] = useState<BookingListResponse | null>(null);

    async function getAllbookings() {
        try {
            const response = await getAllBookings();
            setAllBookings(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load bookings');
        }
    }

    useEffect(() => {
        getAllbookings();
    }, []);

    const filteredBookings = allBookings?.filter(booking =>
        booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddCategory = () => {
        router.push("/categories/add");
    };


    const getStatusBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}

            <Button variant="secondary" onClick={handleAddCategory} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Category
            </Button>
            <div className="flex justify-end">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
                    <Input
                        type="search"
                        placeholder="Search by booking code..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredBookings ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking Code</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.map((booking) => (
                                    <TableRow
                                        key={booking.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => setSelectedBooking(booking)}
                                    >
                                        <TableCell className="font-mono">{booking.bookingCode}</TableCell>
                                        <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">${booking.totalAmount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <BookingModal
                    booking={selectedBooking}
                    isOpen={!!selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}