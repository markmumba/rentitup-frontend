
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MachineListResponse } from '../lib/definitions';
import { getMachineBySearch } from '../lib/service';


export default function Machines() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('query');
    const [machines, setMachines] = useState<MachineListResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchTerm) return;

        const fetchMachines = async () => {
            try {
                const response = await getMachineBySearch(searchTerm);
                setMachines(response);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load machines');
            }
        };

        fetchMachines();
    }, [searchTerm]);

    const handleMachineClick = (id: string) => {
        router.push(`/machines/${id}`);
    };

    if (error) return <div>Error: {error}</div>;


    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {machines.map((machine) => (
                <Card
                    key={machine.id}
                    className="p-4 hover:shadow-lg cursor-pointer"
                    onClick={() => handleMachineClick(machine.id)}
                >
                    {/* Machine Image */}
                    <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={machine.machineImageUrl}
                            alt={machine.name}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    {/* Machine Info */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{machine.condition}</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {machine.isAvailable ? "Available" : "Not Available"}
                        </p>
                        <p className="text-lg font-bold text-blue-600 mt-2">${machine.basePrice}</p>
                        <Button variant="link" className="mt-4">View Details</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
