import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock, ExternalLink, ChevronDown, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import { useState } from 'react';
import { BookingListResponse, UserDetails } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define columns for the DataTable
const columns: ColumnDef<BookingListResponse>[] = [
    {
        accessorKey: "bookingCode",
        header: "Booking Code",
        cell: ({ row }) => <div className="font-medium">{row.getValue("bookingCode")}</div>
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString()
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString()
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => (
            <div className="font-mono">
                KES {parseFloat(row.getValue("totalAmount")).toLocaleString()}
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    variant={status.toLowerCase() === 'pending' ? 'secondary' : 'success'}
                    className="capitalize"
                >
                    {status.toLowerCase()}
                </Badge>
            );
        }
    },
    {
        id: "actions",
        header: "Details",
        cell: ({ row }) => (
            <Link
                href={`dashboard/bookings/${row.original.id}`}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline"
            >
                View
                <ExternalLink className="h-4 w-4" />
            </Link>
        )
    }
];

interface DataTableProps {
    data: BookingListResponse[];
    title: string;
}

export function DataTable({ data, title }: DataTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { data: bookingStatusList = [] } = useQuery({
        queryKey: ['bookingStatusList'],
        queryFn: bookingAPI.getBookingStatusList
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <Card>
            <CardHeader className="py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                            Showing bookings from latest to oldest
                        </CardDescription>
                    </div>
                    {data.length > 0 && (
                        <Badge variant="outline" className="ml-auto">
                            {data.length} bookings
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4 border-t">
                    <Input
                        placeholder="Filter booking codes..."
                        value={(table.getColumn("bookingCode")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("bookingCode")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <ScrollArea className="w-full">
                    <div className="relative w-full">
                        <Table>
                            <TableHeader className="bg-muted/50 sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="group hover:bg-muted/50"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-32 text-center">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <Clock className="h-8 w-8 mb-2" />
                                                <p>No bookings found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="flex items-center justify-end space-x-2 p-4 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Updated BookingsTable component using the new DataTable
const BookingsTable = ({ bookings, title }: { bookings: BookingListResponse[], title: string }) => (
    <DataTable data={bookings} title={title} />
);


export function Orders({ ownerId, userDetails }: { ownerId: string, userDetails: UserDetails }) {
    const {
        data: bookingList = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['ownerBookings', ownerId],
        queryFn: () => bookingAPI.getBookingsForOwner(ownerId),
        select: (data) => [...data].sort((a, b) => b.id - a.id),
    });

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    {error instanceof Error ? error.message : 'Unable to get booking list'}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="grid gap-6">
                <BookingsTable bookings={bookingList} title="Pending Booking Requests" />
            </div>
        </div>
    );
}

export default Orders;