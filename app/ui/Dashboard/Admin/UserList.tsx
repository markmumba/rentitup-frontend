import { UserDetails } from "@/app/lib/definitions"
import { getAllUsers, getUserById } from "@/app/lib/service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Plus, X } from "lucide-react";
import { useEffect, useState } from "react"


interface Issue {
    id: string;
    code: string;
    description: string;
    status: string;
    createdAt: string;
}

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
    const [userList, setUserList] = useState<UserDetails[]>();
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>();
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

    async function getAllUsersList() {
        try {
            const response = await getAllUsers();
            setUserList(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load user profile');
        }
    }

    const showRole = () => {
        return userList?.filter(user => user.role !== "ADMIN");
    };

    async function getUser(id: string) {
        try {
            const response = await getUserById(id);
            // Mock additional user data
            setSelectedUser(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load user profile');
        }

    }

    const handleAddCategory = () => {
        toast({
            title: "Coming Soon",
            description: "Category addition feature is under development",
        });
    };

    const filteredUsers = showRole()?.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getAllUsersList();
    }, []);

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
                    {filteredUsers ? (
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
                                        onClick={() => getUser(String(user.id))}
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
                    ) : (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* User Details Modal */}
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
};