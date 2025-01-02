'use client'
import {  MachineImageResponse, } from "@/lib/definitions";
import { machineAPI, categoryAPI, isAuthenticated, isOwner, userAPI, isAdmin, maintenanceAPI } from "@/lib/service";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Clock, Calendar, User, Settings } from "lucide-react";

export default function MachinePage() {
    const params = useParams();
    const machineId = params.machineId as string;
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<MachineImageResponse | null>(null);

    // Query for machine details
    const {
        data: machine,
        isLoading: isLoadingMachine,
        error: machineError
    } = useQuery({
        queryKey: ['machine', machineId],
        queryFn: () => machineAPI.getMachineById(machineId),
    });

    // Query for category details (only runs when machine data is available)
    const {
        data: category,
        isLoading: isLoadingCategory
    } = useQuery({
        queryKey: ['category', machine?.categoryId],
        queryFn: () => categoryAPI.getCategoryById(machine?.categoryId!),
        enabled: !!machine?.categoryId,
    });

    const {
        data: userDetails,
        isLoading: isProfileLoading,
    } = useQuery({
        queryKey: ['user', 'profile'],
        queryFn: userAPI.getLoggedUserProfile,
        retry: 1
    });

    // Query for maintenance records (only runs when machine data is available)
    const {
        data: machineMaintenanceRecords,
        isLoading: loadingMaintenanceRecords,
        error: maintenanceRecordsError
    } = useQuery({
        queryKey: ['machineMaintenanceRecords', machine?.id],
        queryFn: () => maintenanceAPI.getMachineMaintenanceRecords(machine?.id!),
        enabled: !!machine?.id && (isOwner() || isAdmin()),
    });

    const openModal = (image: MachineImageResponse) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleBooking = () => {
        if (!isAuthenticated()) {
            const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
            router.push(`/login?redirect=${currentPath}`);
        } else {
            router.push(`/dashboard/booking?machineId=${machineId}&basePrice=${machine?.basePrice}&rate=${category?.priceCalculationType}`);
        }
    };

    const handleUpdateMachine = (machineId: string) => {
        router.push(`/machines/${machineId}/edit`);
    };

    const canUpdateMachine = () => {
        return machine?.owner.id === userDetails?.id;
    };
    const canBookMachine = () => {
        return machine?.owner.id != userDetails?.id;
    };

    const canViewRecords = () => {
        return isAdmin || machine?.owner.id === userDetails?.id;
    }

    // Loading state
    if (isLoadingMachine || isLoadingCategory) {
        return (
            <div className="container mx-auto space-y-6 p-6">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-[300px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[200px]" />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (machineError) {
        return (
            <Alert variant="destructive" className="container mx-auto m-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {machineError instanceof Error ? machineError.message : 'Failed to load machine'}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto lg:p-20 space-y-8">
            {machine && (
                <>
                    <Card className="overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Column - Image */}
                            <div className="relative h-[400px]">
                                <Image
                                    src={machine.machineImages.find((img) => img.isPrimary)?.url || ''}
                                    alt={machine.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Badge variant={machine.isAvailable ? 'success' : 'destructive'}>
                                        {machine.isAvailable ? 'Available' : 'Not Available'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <CardTitle className="text-3xl mb-2">{machine.name}</CardTitle>
                                    <CardDescription className="text-lg">{machine.description}</CardDescription>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {machine.specification.split(",").map((spec, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                                    <span className="text-muted-foreground">{spec.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium mb-1">Condition</h3>
                                            <Badge variant="outline">{machine.condition}</Badge>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">Base Price</h3>
                                            <p className="text-xl font-semibold">KSH {machine.basePrice.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        {!isAdmin() && canBookMachine() && machine.isAvailable && (
                                            <Button size="lg" className="flex-1" onClick={handleBooking}>
                                                Book Now
                                            </Button>
                                        )}
                                        {canUpdateMachine() && (
                                            <Button 
                                                variant="outline" 
                                                size="lg" 
                                                className="flex-1"
                                                onClick={() => handleUpdateMachine(machine.id)}
                                            >
                                                Update Machine
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!isOwner() && (
                            <>
                                <Separator />
                                <CardFooter className="p-6">
                                    <div className="flex items-center gap-4">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <h3 className="font-medium">Owner</h3>
                                            <p className="text-muted-foreground">{machine.owner.fullName}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary">{machine.owner.role}</Badge>
                                                {machine.owner.verifiedAt && (
                                                    <Badge variant="success">Verified</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </>
                        )}
                    </Card>

                    {/* Additional Images Section */}
                    {machine.machineImages.filter(img => !img.isPrimary).length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Additional Images</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {machine.machineImages
                                    .filter((img) => !img.isPrimary)
                                    .map((img) => (
                                        <div
                                            key={img.id}
                                            className="cursor-pointer relative h-[200px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                                            onClick={() => openModal(img)}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`Machine Image ${img.id}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Maintenance Records Section */}
                    { canViewRecords() && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Maintenance Records</h2>
                            </div>
                            
                            {loadingMaintenanceRecords ? (
                                <div className="space-y-4">
                                    {[1, 2].map((i) => (
                                        <Skeleton key={i} className="h-[100px]" />
                                    ))}
                                </div>
                            ) : maintenanceRecordsError ? (
                                <Alert variant="destructive">
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        Failed to load maintenance records
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <div className="grid gap-4">
                                    {machineMaintenanceRecords && machineMaintenanceRecords.length > 0 ? (
                                        machineMaintenanceRecords.map((record) => (
                                            <Card key={record.id}>
                                                <CardContent className="p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                                                                                    <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>Service Date</span>
                                                            </div>
                                                            <p className="font-medium">
                                                                {new Date(record.serviceDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <Clock className="h-4 w-4" />
                                                                <span>Next Service</span>
                                                            </div>
                                                            <p className="font-medium">
                                                                {new Date(record.nextService).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <User className="h-4 w-4" />
                                                                <span>Performed By</span>
                                                            </div>
                                                            <p className="font-medium">{record.performedBy}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <Settings className="h-4 w-4" />
                                                                <span>Status</span>
                                                            </div>
                                                            <Badge variant={record.checked ? "success" : "secondary"}>
                                                                {record.checked ? "Checked" : "Pending"}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <h4 className="text-sm text-muted-foreground mb-1">Description</h4>
                                                            <p>{record.description}</p>
                                                        </div>
                                                        {record.imageRecordUrl && (
                                                            <div>
                                                                <h4 className="text-sm text-muted-foreground mb-2">Service Image</h4>
                                                                <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
                                                                    <Image
                                                                        src={record.imageRecordUrl}
                                                                        alt="Service Record Image"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <Card>
                                            <CardContent className="p-6 text-center text-muted-foreground">
                                                No maintenance records found
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            <ImageModal
                open={isModalOpen}
                onClose={closeModal}
                image={selectedImage}
            />
        </div>
    );
}

const ImageModal = ({
    open,
    onClose,
    image
}: {
    open: boolean;
    onClose: () => void;
    image: MachineImageResponse | null;
}) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity ${
                open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl m-4">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {image && (
                    <div className="relative h-[600px]">
                        <Image
                            src={image.url}
                            alt={`Machine Image ${image.id}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};