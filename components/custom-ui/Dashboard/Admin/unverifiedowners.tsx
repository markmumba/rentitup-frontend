'use client';
import { UserDetailsList } from "@/lib/definitions";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge";
import { userAPI } from "@/lib/service";

export default function UnverifiedOwners() {
    const [collectors, setCollectors] = useState<UserDetailsList[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    async function handleGetCollectors() {
        try {
            setIsLoading(true);
            const response = await userAPI.collectors.getUnverified();
            setCollectors(response);
        } catch (error) {
            toast({
                title: "Error getting collectors",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetCollectors();
    }, []);

    const handleCollectorClick = (collectorEmail: string) => {
        router.push(`dashboard/owners/${collectorEmail}`);
    }

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full px-4">
            <div className="w-full max-w-full rounded-md border overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/5">Name</TableHead>
                            <TableHead className="w-1/4">Email</TableHead>
                            <TableHead className="w-1/6">Role</TableHead>
                            <TableHead className="w-1/6 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collectors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No unverified collectors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            collectors.map((collector) => (
                                <TableRow
                                    key={collector.id}
                                    className="hover:bg-muted/50 cursor-pointer"
                                    onClick={() => handleCollectorClick(collector.id)}
                                >
                                    <TableCell className="font-medium">{collector.fullName}</TableCell>
                                    <TableCell>{collector.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="default"> {collector.role} </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCollectorClick(collector.id);
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