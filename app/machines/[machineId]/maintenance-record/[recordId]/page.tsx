'use client';

'use client';

import Image from 'next/image';
import { ProtectedRoute } from "@/app/protector";
import { MaintenanceRecordResponse } from "@/lib/definitions";
import { maintenanceAPI } from "@/lib/service";
import { admin } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    AlertCircle, 
    Calendar, 
    User, 
    Wrench, 
    ClipboardCheck,
    ImageIcon,
    X
} from "lucide-react";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/components/ui/alert";
import { useState } from "react";
import { toast } from '@/hooks/use-toast';

function SingleMaintenanceRecordPage({ params }: { params: { recordId: string } }) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const queryClient = useQueryClient();
    
    // Mutation for verifying record
    const verifyMutation = useMutation({
        mutationFn: maintenanceAPI.verifyRecord,
        onSuccess: (updatedRecord) => {
            // Update the cache with new data
            queryClient.setQueryData(
                ['maintenanceRecord', params.recordId], 
                updatedRecord
            );
            toast({
                title: "Success",
                description: "Maintenance record has been verified",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to verify record",
                variant: "destructive",
            });
        },
    });

    const {
        data: maintenanceRecord,
        isLoading: loadingRecord,
        error: recordError
    } = useQuery<MaintenanceRecordResponse>({
        queryKey: ['maintenanceRecord', params.recordId],
        queryFn: () => maintenanceAPI.getMaintenanceRecordById(params.recordId),
        retry: false,
        throwOnError: true
    });

    if (recordError) {
        return (
            <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load maintenance record. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    if (loadingRecord) {
        return (
            <div className="max-w-2xl mx-auto space-y-4 p-4">
                <Skeleton className="h-8 w-64" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!maintenanceRecord) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Maintenance Record Details</h1>
                <Badge variant={maintenanceRecord.checked ? "default" : "secondary"}>
                    {maintenanceRecord.checked ? "Checked" : "Pending Check"}
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Service Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Service Date</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(maintenanceRecord.serviceDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <User className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Performed By</p>
                            <p className="text-sm text-muted-foreground">
                                {maintenanceRecord.performedBy}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Wrench className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-sm text-muted-foreground">
                                {maintenanceRecord.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Next Service</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(maintenanceRecord.nextService).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {maintenanceRecord.imageRecordUrl && (
                        <div className="pt-4">
                            <p className="text-sm font-medium mb-2">Service Record Image</p>
                            <div 
                                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setIsImageModalOpen(true)}
                            >
                                {/* Image preview */}
                                <Image
                                    src={maintenanceRecord.imageRecordUrl}
                                    alt="Maintenance Record"
                                    width={400}
                                    height={192}
                                    className="w-full h-48 object-cover rounded-md"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Button variant="secondary" size="sm">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        View Full Image
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
                <Button 
                    variant="default"
                    onClick={() => verifyMutation.mutate(params.recordId)}
                    disabled={maintenanceRecord.checked || verifyMutation.isPending}
                    className="min-w-[100px]"
                >
                    {verifyMutation.isPending ? (
                        <span className="flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4 animate-spin" />
                            Verifying...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4" />
                            Verify
                        </span>
                    )}
                </Button>
                <Button 
                    variant="destructive"
                    disabled={maintenanceRecord.checked}
                    onClick={() => toast({
                        description: "Nullify functionality coming soon",
                    })}
                    className="min-w-[100px]"
                >
                    <X className="h-4 w-4 mr-2" />
                    Nullify
                </Button>
            </div>

            {/* Image Modal */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle>Maintenance Record Image</DialogTitle>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setIsImageModalOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogHeader>
                    {maintenanceRecord.imageRecordUrl && (
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={maintenanceRecord.imageRecordUrl}
                                alt="Maintenance Record"
                                width={1200}
                                height={800}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function ProtectedSingleMaintenanceRecordPage({ params }: { params: { recordId: string } }) {
    return (
        <ProtectedRoute allowedRoles={admin}>
            <SingleMaintenanceRecordPage params={params} />
        </ProtectedRoute>
    );
}