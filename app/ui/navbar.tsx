
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isAdmin, isAuthenticated, isCustomer, isOwner } from '../lib/service';
import { Menu, X } from 'lucide-react';
import { LogoutButton } from './logoutbutton';
import { useAuthStore } from '../lib/store';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const token = useAuthStore(state => state.token);
    const role = useAuthStore(state => state.role);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const NavLinks = () => (
        <>
            {!isAuthenticated() &&
                <>
                    <Link href="/login">
                        <Button variant="default">Login</Button>
                    </Link>

                    <Link href="/register">
                        <Button variant="ghost">Register</Button>
                    </Link>

                    <Link href="/categories">
                        <Button variant="ghost">Categories</Button>
                    </Link>
                </>
            }

            {isAuthenticated() && (
                <>
                    <p>user is authenticated</p>

                    {isCustomer() && (
                        <>
                            <p>user is customer</p>
                            <Link href="/categories">
                                <Button variant="ghost">Categories</Button>
                            </Link>

                            <Link href="/book">
                                <Button variant="ghost">Book</Button>
                            </Link>
                        </>
                    )}

                    {isOwner() && (
                        <>
                            <p>user is owner</p>
                            <Link href="/bookings">
                                <Button variant="ghost">Orders</Button>
                            </Link>
                        </>
                    )}

                    {isAdmin() && (
                        <>
                            <p>user is admin</p>
                            <Link href="/owners">
                                <Button variant="ghost">Owners</Button>
                            </Link>
                            <Link href="/machines">
                                <Button variant="ghost">Machines</Button>
                            </Link>
                        </>
                    )}

                    <Link href="dashboard/profile">
                        <Button variant="ghost">Profile</Button>
                    </Link>
                    <Link href="/">
                        <LogoutButton />
                    </Link>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                    <Link href={isAuthenticated() ? "/dashboard" : "/"} className="font-bold text-3xl">
                            Rentitup
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLinks />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pt-4 pb-3 space-y-2">
                        <div className="flex flex-col space-y-2">
                            <NavLinks />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;