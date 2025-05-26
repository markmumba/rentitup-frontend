'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { BACKEND_URL, dateConverter } from '@/lib/utils';
import { userAPI } from '@/lib/service';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function CollectorPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const userId = params.id as string;
    const [verificationImageSrc, setVerificationImageSrc] = useState<string | null>(null);


    const { data: userDetails, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => userAPI.getUserById(userId),
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });

    console.log(userDetails);

    useEffect(() => {
        if (userDetails?.verificationImage) {
            // Check if image is stored in localStorage
            const storedImage = localStorage.getItem(userDetails.verificationImage);
            if (storedImage) {
                setVerificationImageSrc(storedImage);
            } else {
                // Construct full URL for backend images
                const imageUrl = userDetails.verificationImage.startsWith('http') 
                    ? userDetails.verificationImage 
                    : `${BACKEND_URL}/${userDetails.verificationImage}`;
                setVerificationImageSrc(imageUrl);
            }
        }
    }, [userDetails?.verificationImage]);

        console.log(verificationImageSrc);
    const verifyCollectorMutation = useMutation({
        mutationFn: ({ verify }: { verify: boolean }) =>
            userAPI.collectors.verifyCollector(userId, verify),
        onSuccess: (_, { verify }) => {
            toast({
                title: verify ? "owner" : "Owner Not Verified",
                description: `Owner has been ${verify ? 'verified' : 'marked as not verified'}`,
                variant: verify ? "default" : "destructive"
            });

            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ['user', userId] });

            // Redirect back to dashboard
            router.push('/dashboard');
        },
        onError: (error) => {
            toast({
                title: "Verification Error",
                description: error instanceof Error ? error.message : "Failed to process verification",
                variant: "destructive"
            });
        }
    });

    if (isLoading) {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-12" />
                    <Skeleton className="h-12" />
                </div>
            </div>
        );
    }

    console.log();

    if (!userDetails) {
        return <div>No user details found</div>;
    }

    return (
        <div className="container mx-auto my-20 p-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Owner Verification Details</CardTitle>
                    <CardDescription>Review owner information and verification document</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-semibold">{userDetails.fullName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{userDetails.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p>{userDetails.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created On</p>
                            <p>{dateConverter(userDetails.createdAt)}</p>
                        </div>
                    </div>

                    {/* Verification Image */}
                    {verificationImageSrc && (
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Verification Document</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                        <Image
                                            src={verificationImageSrc}
                                            alt="Verification Document"
                                            width={300}
                                            height={200}
                                            className="rounded-lg object-cover"
                                            priority
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                        <DialogTitle>Verification Document</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex justify-center">
                                        <Image
                                            src={verificationImageSrc}
                                            alt="Verification Document (Full Size)"
                                            width={800}
                                            height={600}
                                            className="rounded-lg object-contain max-h-[70vh]"
                                            priority
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    {/* Verification Actions */}
                    <div className="flex justify-between items-center">
                        <Badge variant={userDetails.verified ? "default" : "destructive"}>
                            {userDetails.verified ? "Already Verified" : "Pending Verification"}
                        </Badge>

                        <div className="flex space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => verifyCollectorMutation.mutate({ verify: false })}
                                disabled={verifyCollectorMutation.isPending}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Do Not Verify
                            </Button>

                            <Button
                                onClick={() => verifyCollectorMutation.mutate({ verify: true })}
                                disabled={verifyCollectorMutation.isPending}
                                variant="default"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Verify Collector
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}