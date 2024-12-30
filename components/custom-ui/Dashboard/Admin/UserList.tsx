import { UserDetails } from "@/lib/definitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, X, Search, UserCircle, Phone, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userAPI } from "@/lib/service";

const UserModal = ({ user, isOpen, onClose }: {
    user: UserDetails;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5" />
                        {user.fullName}
                    </DialogTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                                    <p className="text-sm">{user.fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                                    <p className="text-sm">{user.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Role</label>
                                    <p className="text-sm">
                                        <Badge variant="outline" className="mt-0.5">
                                            {user.role}
                                        </Badge>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Account Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-xs text-muted-foreground">Total Bookings</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-xs text-muted-foreground">Active Bookings</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold">8</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold">1</p>
                                <p className="text-xs text-muted-foreground">Cancelled</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    </Dialog>
);

const UserStatusBadge = ({ status }: { status: string }) => {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Badge variant="outline" className={getStatusStyle(status)}>
            {status}
        </Badge>
    );
};

export const UserList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

    const { 
        data: userList,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['users'],
        queryFn: userAPI.getAllUsers,
    });

    const filteredUsers = userList
        ?.filter(user => user.role !== "ADMIN")
        ?.filter(user => {
            const matchesSearch = 
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
            return matchesSearch && matchesRole;
        });

    const handleUserClick = async (userId: string) => {
        const basicUser = userList?.find(u => u.id === userId);
        if (basicUser) {
            try {
                const fullUserDetails = await userAPI.getUserById(String(basicUser.id));
                setSelectedUser(fullUserDetails);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load user details",
                });
            }
        }
    };

    return (
        <div className="space-y-4">
            <Card className="md:pt-10">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Users</CardTitle>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-48">
                                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search users..."
                                    className="pl-8 h-8 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue placeholder="Filter role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="user">owner</SelectItem>
                                    <SelectItem value="manager">customer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-8 w-full" />
                            ))}
                        </div>
                    ) : filteredUsers ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
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
                                            <TableCell>
                                                <UserStatusBadge status="active" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : null}
                </CardContent>
            </Card>

            {selectedUser && (
                <UserModal
                    user={selectedUser}
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