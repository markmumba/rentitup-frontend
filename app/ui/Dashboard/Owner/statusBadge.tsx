import React, { useMemo, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { isOwner, updateStatus } from '@/app/lib/service';
import { BookingResponse } from '@/app/lib/definitions';


const STATUS_ORDER:Record<any,number> = {
    "PENDING": 0,
    "CONFIRMED": 1,
    "ONGOING": 2,
    "COMPLETED": 3,
    "CANCELLED": 4
};

const StatusBadge = ({ booking, statusList }:{booking:BookingResponse,statusList:string[]}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');

    // Filter available statuses based on current status
    const availableStatuses = useMemo(() => {
        if (!booking || !statusList) return [];

        const currentStatusIndex = STATUS_ORDER[booking.status];
        return statusList.filter(status => {
            const statusIndex = STATUS_ORDER[status];
            // Allow CANCELLED status at any point, but only show statuses that come after the current one
            return status === "CANCELLED" || statusIndex > currentStatusIndex;
        });
    }, [booking, statusList]);

    const handleStatusUpdate = async (newStatus: any) => {
        if (!booking || newStatus === booking.status) return;
    
        try {
          setIsUpdating(true);
          await updateStatus(booking.id, newStatus);
          setOpen(false);
          
          // Option 1: Force reload the current page
          window.location.reload();
          
          // Option 2: Redirect to the same page (this will trigger a fresh data fetch)
          // router.push(`/dashboard/bookings/${booking.id}`);
          
          // Option 3: If using SWR or React Query, you can trigger a revalidation
          // mutate(`/api/bookings/${booking.id}`);
          
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to update booking status');
        } finally {
          setIsUpdating(false);
        }
      };

    if (!booking) return null;

    const getStatusColor = (status: string) => {
        const colors = {
            PENDING: 'bg-yellow-500',
            CONFIRMED: 'bg-green-500',
            CANCELLED: 'bg-red-500',
            COMPLETED: 'bg-blue-500'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500';
    };

    if (isOwner()) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between",
                            getStatusColor(booking.status),
                            "text-white hover:text-white hover:opacity-90 rounded-full"
                        )}
                        disabled={isUpdating}
                    >
                        {booking.status.toLowerCase()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        {availableStatuses.length > 0 ? (
                            <CommandList>
                                <CommandGroup>
                                    {availableStatuses.map((status:any) => (
                                        <React.Fragment key={status}>
                                            <CommandItem
                                                value={status}
                                                onSelect={(currentValue) => {
                                                    handleStatusUpdate(currentValue);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        booking.status === status ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {status.toLowerCase()}
                                            </CommandItem>
                                            <CommandSeparator />
                                        </React.Fragment>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>No further status updates available.</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Badge className={cn(getStatusColor(booking.status), "text-white")}>
            {booking.status.toLowerCase()}
        </Badge>
    );
};

export default StatusBadge;


