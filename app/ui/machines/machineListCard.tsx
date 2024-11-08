import { MachineListResponse } from "@/app/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";



export function MachineListCard({ machine }:{machine:MachineListResponse}) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{machine.name}</CardTitle>
          <CardDescription>
            Base Price: ${machine.basePrice}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        {machine.machineImageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={machine.machineImageUrl}
              alt={machine.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
          <Badge
            variant={machine.isAvailable ? "secondary" : "destructive"}
            className="mt-2"
          >
            {machine.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </CardContent>
      </Card>
    );
  }