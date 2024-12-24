import { MachineListResponse } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";



export function MachineListCard({ machine }: { machine: MachineListResponse }) {
  const router = useRouter();
  return (
    <Card className="hover:bg-gray-100 dark:hover:bg-gray-900"  onClick={() => router.push(`/machines/${machine.id}`)}>
      <CardHeader>
        <CardTitle className="text-xl">{machine.name}</CardTitle>
        <CardDescription>
          Base Price: ksh{machine.basePrice}
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
              sizes="(max-width: 600px) 80vw, (max-width: 1000px) 40vw, 25vw"
              priority={false}
            />
          </div>
        )}
        <CardDescription>
          {machine.description}
        </CardDescription>
        <Badge
          variant={machine.isAvailable ? "success" : "destructive"}
          className="mt-2"
        >
          {machine.isAvailable ? "Available" : "Unavailable"}
        </Badge>
      </CardContent>
    </Card>
  );
}