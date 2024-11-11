'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getMachineBySearch } from '../lib/service';

interface MachineListResponse {
  id: string;
  name: string;
  basePrice: string;
  isAvailable: boolean;
  machineImageUrl: string;
  description: string;
  condition: string;
  categoryId: string;
}

export default function Machines() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');
  const [machines, setMachines] = useState<MachineListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchMachines = async () => {
      setIsLoading(true);
      try {
        const response = await getMachineBySearch(searchTerm);
        setMachines(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load machines');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachines();
  }, [searchTerm]);

  const handleMachineClick = (id: string) => {
    router.push(`/machines/${id}`);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {machines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No machines found</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {machines.map((machine) => (
              <Card
                key={machine.id}
                className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleMachineClick(machine.id)}
              >
                <div className="p-4 space-y-4">
                  <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={machine.machineImageUrl}
                      alt={machine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {machine.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {machine.condition}
                      </span>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        machine.isAvailable 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {machine.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-blue-600">
                      ${machine.basePrice}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}