import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BanknoteIcon, Info } from "lucide-react";
import Image from "next/image";
import { MachineResponse, VerificationState } from '@/lib/definitions';




interface MachineCardProps {
    machine: MachineResponse;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
    onClick: (id: string) => void;
    onAddMaintenanceRecords: (id: string) => void;
}

const MachineCard: React.FC<MachineCardProps> = ({
    machine,
    onDelete,
    onUpdate,
    onClick,
    onAddMaintenanceRecords
}) => {

    const renderOverlay = () => {
        switch (machine.verificationState) {
            case VerificationState.PENDING:
                return (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5">
                        <Button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onAddMaintenanceRecords(machine.id);
                            }}
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                            Add Maintenance Records
                        </Button>
                    </div>
                );
            case VerificationState.ONGOING:
                return (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5">
                        <div className="bg-white p-4 rounded-md text-center">
                            <p className="text-sm text-gray-600">Awaiting verification of records</p>
                        </div>
                    </div>
                );
            case VerificationState.COMPLETE:
                return null;
            default:
                return null;
        }
    };

    const primaryImage = machine.machineImages.find(img => img.isPrimary);
    const handleCardClick = () => {
        // Only allow card click if verification is COMPLETE
        if (machine.verificationState === VerificationState.COMPLETE) {
            onClick(machine.id);
        }
    }
    return (

        <Card
            className={`overflow-hidden relative ${machine.verificationState !== VerificationState.COMPLETE ? "opacity-75" : ""
                } cursor-${machine.verificationState === VerificationState.COMPLETE ? 'pointer' : 'default'} hover:shadow-lg transition-shadow`}
            onClick={handleCardClick}
        >
            {renderOverlay()}
            <div className="aspect-video relative">
                {primaryImage && (
                    <Image
                        src={primaryImage.url}
                        alt={machine.name}
                        className="object-cover w-full h-full"
                        width={800}
                        height={800}
                        priority
                    />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant={machine.isAvailable ? "success" : "secondary"}>
                        {machine.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                    <Badge
                        variant={machine.verificationState === VerificationState.COMPLETE ? "success" : "destructive"}
                    >
                        {machine.verificationState}
                    </Badge>
                </div>
            </div>

            <CardHeader>
                <CardTitle>{machine.name}</CardTitle>
                <CardDescription>{machine.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                    <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                        KES {machine.basePrice.toLocaleString()} / base price
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline">{machine.condition}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                    {machine.specification.split(",").map((spec, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span>•</span>
                            <span>{spec.trim()}</span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex space-x-2">
                <Button
                    variant="destructive"
                    className="text-xs"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onDelete(machine.id);
                    }}
                >
                    Remove machine
                </Button>
                <Button
                    variant="secondary"
                    className="text-xs"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onUpdate(machine.id);
                    }}
                >
                    Update machine
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MachineCard;