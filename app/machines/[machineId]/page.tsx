'use client'
import { BookingRequest, MachineImageResponse, MachineResponse } from "@/lib/definitions";
import { machineAPI, categoryAPI, isAuthenticated, isCustomer, isOwner, userAPI, isAdmin } from "@/lib/service"; // Assuming this is where your API functions are exported
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

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
        error: profileError
    } = useQuery({
        queryKey: ['user', 'profile'],
        queryFn: userAPI.getLoggedUserProfile,
        retry: 1
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
        return machine?.owner.id === userDetails?.id
    }

    // Loading state
    if (isLoadingMachine || isLoadingCategory) {
        return (
            <div className="space-y-6 p-6">
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
            <Alert variant="destructive" className="m-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {machineError instanceof Error ? machineError.message : 'Failed to load machine'}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {machine && (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>{machine.name}</CardTitle>
                            <CardDescription>{machine.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Image
                                        src={machine.machineImages.find((img) => img.isPrimary)?.url || '/api/placeholder/800/500'}
                                        alt={machine.name}
                                        width={800}
                                        height={500}
                                        className="w-full h-[300px] object-cover rounded-md"
                                    />
                                </div>
                                <div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-medium">Specifications</h3>
                                            <p className="text-muted-foreground">{machine.specification}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">Condition</h3>
                                            <p className="text-muted-foreground">{machine.condition}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">Pricing</h3>
                                            <p className="text-muted-foreground">
                                                Base Price: ksh{machine.basePrice}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">Availability</h3>
                                            <Badge variant={machine.isAvailable ? 'success' : 'destructive'}>
                                                {machine.isAvailable ? 'Available' : 'Not Available'}
                                            </Badge>
                                        </div>
                                        {!isAdmin()  && (
                                            <>
                                                {machine.isAvailable && (
                                                    <Button onClick={handleBooking}>Book</Button>
                                                )}
                                            </>
                                        )}

                                        {canUpdateMachine() && (
                                            <Button onClick={() => handleUpdateMachine(machine.id)}>Update machine</Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        {!isOwner() && (
                            <CardFooter>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-medium">Owner</h3>
                                        <p className="text-muted-foreground">{machine.owner.fullName}</p>
                                        <p className="text-muted-foreground">{machine.owner.email}</p>
                                        <p className="text-muted-foreground">{machine.owner.phone}</p>
                                        <Badge variant="secondary">{machine.owner.role}</Badge>
                                    </div>
                                    {machine.owner.verifiedAt && (
                                        <Badge variant="success">Verified</Badge>
                                    )}
                                </div>
                            </CardFooter>
                        )}
                    </Card>

                    <h2 className="text-2xl font-bold">Additional Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {machine.machineImages
                            .filter((img) => !img.isPrimary)
                            .map((img) => (
                                <div
                                    key={img.id}
                                    className="cursor-pointer"
                                    onClick={() => openModal(img)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`Machine Image ${img.id}`}
                                        width={400}
                                        height={300}
                                        className="w-full h-[200px] object-cover rounded-md"
                                    />
                                </div>
                            ))}
                    </div>
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                    <Image
                        src={image.url}
                        alt={`Machine Image ${image.id}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                    />
                )}
            </div>
        </div>
    );
};