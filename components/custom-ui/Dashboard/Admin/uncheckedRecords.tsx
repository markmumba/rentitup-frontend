'use client';
import { MaintenanceRecordResponse } from "@/lib/definitions";
import { toast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { maintenanceAPI } from "@/lib/service";
import { useQuery } from "@tanstack/react-query";

export default function UncheckedMaintenanceRecords() {
    const router = useRouter();

    // Using React Query for data fetching
    const { 
        data: records,
        isLoading,
        isError,
        error
    } = useQuery<MaintenanceRecordResponse[], Error>({
        queryKey: ['uncheckedMaintenance'],
        queryFn: maintenanceAPI.getUncheckedMaintenanceRecords,
        // Optional: configure stale time and refetch interval
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    });

    const handleRecordClick = (recordId: string) => {
        router.push(`/dashboard/maintenance/${recordId}`);
    };

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    if (isError) {
        toast({
            title: "Error getting maintenance records",
            description: error?.message || "Please try again later",
            variant: "destructive"
        });
    }

    return (
        <div className="w-full px-4">
            <div className="w-full max-w-full rounded-md border overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/6">Service Date</TableHead>
                            <TableHead className="w-1/4">Description</TableHead>
                            <TableHead className="w-1/6">Performed By</TableHead>
                            <TableHead className="w-1/6">Next Service</TableHead>
                            <TableHead className="w-1/6">Status</TableHead>
                            <TableHead className="w-1/6 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!records || records.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No unchecked maintenance records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            records.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="hover:bg-muted/50 cursor-pointer"
                                    onClick={() => handleRecordClick(record.id)}
                                >
                                    <TableCell>
                                        {new Date(record.serviceDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {record.description}
                                    </TableCell>
                                    <TableCell>{record.performedBy}</TableCell>
                                    <TableCell>
                                        {new Date(record.nextService).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={record.checked ? "default" : "secondary"}
                                            className="whitespace-nowrap"
                                        >
                                            {record.checked ? "Checked" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRecordClick(record.id);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}