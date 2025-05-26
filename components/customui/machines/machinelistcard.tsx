import { MachineListResponse } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/utils";


const getImageUrl = (url: string | null | undefined, backendUrl: string): string | null => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${backendUrl}/${url}`;
};



export default function MachineListCard({ machine }: { machine: MachineListResponse }) {
  const router = useRouter();
  const machineImageUrl = getImageUrl(machine.machineImageUrl, BACKEND_URL);
   console.log(machineImageUrl);

  return (
    <Card className="hover:bg-gray-100 dark:hover:bg-gray-900"  onClick={() => router.push(`/machines/${machine.id}`)}>
      <CardHeader>
        <CardTitle className="text-xl">{machine.name}</CardTitle>
        <CardDescription>
          Base Price: ksh{machine.basePrice}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {machineImageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={machineImageUrl}
              alt={machine.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
        <CardDescription>{machine.description}</CardDescription>
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