'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {
    Home,
    User,
    CalendarCheck,
    ListTodo,
    LogOut,
    HomeIcon
} from "lucide-react";
import { isAdmin, isAuthenticated, isOwner, isCustomer } from '@/lib/service';
import { LogoutButton } from './logoutbutton';
import { ModeToggle } from "@/components/customui/common/modaltoggle";

export default function ProtectedSideNavbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const sidebarItems = [

        ...(isAuthenticated() ? [
            {
                title: "dashboard",
                url: "/dashboard",
                icon: HomeIcon,
                isVisible: true
            },
        ] : []),

        // customer Routes
        ...(isAuthenticated() && isCustomer() ? [
            {
                title: "Schedule",
                url: "/categories",
                icon: CalendarCheck,
                isVisible: true
            }
        ] : []),

        // collector Routes
        ...(isAuthenticated() && isOwner() ? [
            {
                title: "Requests",
                url: "/dashboard/orders",
                icon: ListTodo,
                isVisible: true
            },
            {
                title: "Schedule",
                url: "/categories",
                icon: CalendarCheck,
                isVisible: true
            }
        ] : []),

        // refactor Routes
        ...(isAuthenticated() && isAdmin() ? [
            {
                title: "Categories",
                url: "/categories",
                icon: CalendarCheck,
                isVisible: true
            },
            {
                title: "All Bookings",
                url: "/dashboard/bookings",
                icon: CalendarCheck,
                isVisible: true
            },
            {
                title: "Users",
                url: "/dashboard/users",
                icon: User,
                isVisible: true
            }
        ] : []),
        ...(isAuthenticated() ? [
            {
                title: "Profile",
                url: "/dashboard/profile",
                icon: User,
                isVisible: true
            }
        ] : []),
    ];

    return (
        <Sidebar>
            <SidebarHeader>
                <Link
                    href="/dashboard"
                    className={`flex items-center space-x-3 px-4 ${isActive("/dashboard") ? "text-primary" : ""}`}
                >
                    <span className="font-bold text-3xl">Rentitup</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={`flex items-center space-x-2 ${isActive(item.url) ? "bg-primary text-primary-foreground" : ""}`}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}


                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <ModeToggle />
                    <SidebarMenuButton>
                        <div className="flex items-center space-x-2">
                            <LogOut />
                            <LogoutButton />
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar >
    );
}