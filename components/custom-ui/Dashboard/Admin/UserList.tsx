import { UserDetails } from "@/lib/definitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userAPI } from "@/lib/service";

const UserModal = ({ user, isOpen, onClose }: {
    user: UserDetails;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle>User Details</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <p className="mt-1">{user.fullName}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="mt-1">{user.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                <p className="mt-1">{user.phone}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                <p className="mt-1">{user.role}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Account Details</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </DialogContent>
    </Dialog>
);

export const UserList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

    // Query for all users
    const { 
        data: userList,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['users'],
        queryFn: userAPI.getAllUsers,
    });

    // Query for single user details
    const {
        data: userDetails,
        refetch: refetchUserDetails
    } = useQuery({
        queryKey: ['user', selectedUser?.id],
        queryFn: () => selectedUser ? userAPI.getUserById(String(selectedUser.id)) : null,
        enabled: !!selectedUser, 
    });

    // Filter out admin users and apply search
    const filteredUsers = userList
        ?.filter(user => user.role !== "ADMIN")
        ?.filter(user =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleUserClick = async (userId: string) => {
        const user = userList?.find(u => u.id === userId);
        if (user) {
            setSelectedUser(user);
        }
    };

 

    return (
        <div className="space-y-6">
            {/* Top Actions */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : filteredUsers ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Bookings</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => handleUserClick(String(user.id))}
                                    >
                                        <TableCell className="font-medium">{user.fullName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : null}
                </CardContent>
            </Card>

            {/* User Details Modal */}
            {selectedUser && (
                <UserModal
                    user={userDetails || selectedUser}
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {isError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error instanceof Error ? error.message : 'Failed to load users'}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};