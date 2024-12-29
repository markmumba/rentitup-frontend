'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MapPin, Package, User, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useParams, useRouter } from 'next/navigation';
import { isAdmin, isCustomer, isOwner } from '@/lib/service';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ProtectedRoute } from '@/app/protector';
import { allRoles } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service';
import StatusBadge from '@/components/custom-ui/dashboard/owner/statusbadge';

export default function ProtectedSingleBookingPage() {
    return (
        <ProtectedRoute allowedRoles={allRoles}>
            <SingleBookingPage />
        </ProtectedRoute>
    );
}

function SingleBookingPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const bookingId = params.id as string;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Existing queries and mutations
    const {
        data: booking,
        isLoading: isLoadingBooking,
        error: bookingError
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => bookingAPI.getBookingById(bookingId),
    });

    const {
        data: statusList = [],
        isLoading: isLoadingStatus
    } = useQuery({
        queryKey: ['bookingStatusList'],
        queryFn: bookingAPI.getBookingStatusList,
        enabled: isOwner(),
    });

    const {
        mutate: deleteBookingMutation,
        isPending: isDeleting
    } = useMutation({
        mutationFn: () => bookingAPI.deleteBooking(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Failed to delete booking:', error);
        },
        onSettled: () => {
            setShowDeleteDialog(false);
        }
    });

    // Existing handlers
    const handleUpdate = () => router.push(`/bookings/${bookingId}/edit`);
    const handleDelete = () => deleteBookingMutation();
    const canModifyBooking = () => booking?.status === 'PENDING' && isCustomer();
    const makePayment = () => booking?.status === 'CONFIRMED' && isCustomer();

    const UserDetailsSection = ({ title, user }: { title: string; user: { name: string; email: string } }) => (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h2 className="text-gray-600 mb-2">{title}</h2>
                <p className="font-semibold text-gray-900">Name: {user.name}</p>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>
        </div>
    );

    const renderUserDetails = () => {
        if (!booking) return null;

        if (isAdmin()) {
            return (
                <>
                    <UserDetailsSection title="Customer Details" user={booking.customer} />
                    <UserDetailsSection title="Owner Details" user={booking.machine.owner} />
                </>
            );
        } else if (isCustomer()) {
            return <UserDetailsSection title="Owner Details" user={booking.machine.owner} />;
        } else if (isOwner()) {
            return <UserDetailsSection title="Customer Details" user={booking.customer} />;
        }
        return null;
    };


    if (bookingError) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-2xl">
                    <CardContent className="pt-6">
                        <div className="text-center text-red-500">
                            {bookingError instanceof Error ? bookingError.message : 'Failed to load booking'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoadingBooking) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!booking) return null;

    // New Invoice-style layout
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white">
                    <CardContent className="p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-1">Invoice</h1>
                                <p className="text-gray-500">Booking Code: {booking.bookingCode}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <StatusBadge booking={booking} statusList={statusList} />
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {renderUserDetails()}
                            <div>
                                <h2 className="text-gray-600 mb-2">Due Date</h2>
                                <p className="font-semibold text-gray-900">
                                    {format(new Date(booking.startDate), 'PP')}
                                </p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-8">
                            <h2 className="text-gray-600 mb-2">Pickup Location</h2>
                            <p className="text-gray-900">{booking.pickUpLocation}</p>
                        </div>

                        {/* Machine Details as Items */}
                        <div className="mb-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-600">Machine</th>
                                        <th className="text-center py-3 px-4 text-gray-600">Duration</th>
                                        <th className="text-right py-3 px-4 text-gray-600">Rate</th>
                                        <th className="text-right py-3 px-4 text-gray-600">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-12 h-12 mr-4">
                                                    <Image
                                                        src={booking.machine.imageUrl}
                                                        alt={booking.machine.name}
                                                        width={48}
                                                        height={48}
                                                        className="rounded-md object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{booking.machine.name}</p>
                                                    <p className="text-sm text-gray-500">{booking.machine.specification}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-900">
                                            {format(new Date(booking.startDate), 'PP')} -
                                            {format(new Date(booking.endDate), 'PP')}
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-900">
                                            KES {booking.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-900">
                                            KES {booking.totalAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Summary */}
                        <div className="border-t border-gray-200 pt-4">
                            <div className="max-w-xs ml-auto">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900 font-medium">
                                        KES {booking.totalAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-900 font-medium">KES 0</span>
                                </div>
                                <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                                    <span className="text-gray-900 font-semibold">Total</span>
                                    <span className="text-gray-900 font-bold">
                                        KES {booking.totalAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {canModifyBooking() && (
                            <div className="flex justify-end space-x-4 mt-8">
                                <Button
                                    variant="outline"
                                    onClick={handleUpdate}
                                    className="flex items-center gap-2"
                                >
                                    <Edit className="h-4 w-4" />
                                    Update
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setShowDeleteDialog(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        )}

                        {makePayment() && (
                            <div className="flex justify-start mt-8">
                                <Button
                                    variant="default"
                                    onClick={handleUpdate}
                                    className="flex items-center gap-2"
                                >
                                    <DollarSign className="h-4 w-4" />
                                    Make Payment
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the booking.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
