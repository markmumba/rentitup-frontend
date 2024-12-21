
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isAdmin, isAuthenticated, isCustomer, isOwner } from '../../lib/service';
import { Menu, X } from 'lucide-react';
import { LogoutButton } from './logoutbutton';
import { useAuthStore } from '../../lib/store';
import { ModeToggle } from './modalToggle';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const token = useAuthStore(state => state.token);
    const role = useAuthStore(state => state.role);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path: string) => pathname === path;

    const NavLinks = () => (
        <>
            {!isAuthenticated() &&
                <>
                    <Link href="/login">
                        <Button
                            variant={isActive('/login') ? 'default' : 'ghost'}
                            className={isActive('/login') ? 'bg-gray-200' : ''}
                        >
                            Login
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button
                            variant={isActive('/register') ? 'default' : 'ghost'}
                            className={isActive('/register') ? 'bg-gray-200' : ''}
                        >
                            Register
                        </Button>
                    </Link>

                    <Link href="/categories">
                        <Button
                            variant={isActive('/categories') ? 'default' : 'ghost'}
                            className={isActive('/categories') ? 'bg-gray-200' : ''}
                        >
                            Categories
                        </Button>
                    </Link>
                </>
            }

            {isAuthenticated() && (
                <>
                    {isCustomer() && (
                        <Link href="/categories">
                            <Button
                                variant={isActive('/categories') ? 'default' : 'ghost'}
                                className={isActive('/categories') ? 'bg-gray-200' : ''}
                            >
                                Book
                            </Button>
                        </Link>
                    )}

                    {isOwner() && (
                        <>
                            <Link href="/orders">
                                <Button
                                    variant={isActive('/orders') ? 'default' : 'ghost'}
                                    className={isActive('/orders') ? 'bg-gray-200' : ''}
                                >
                                    Orders
                                </Button>
                            </Link>
                            <Link href="/categories">
                                <Button
                                    variant={isActive('/categories') ? 'default' : 'ghost'}
                                    className={isActive('/categories') ? 'bg-gray-200' : ''}
                                >
                                    Book
                                </Button>
                            </Link>
                        </>
                    )}

                    {isAdmin() && (
                        <>
                            <Link href="/categories">
                                <Button
                                    variant={isActive('/categories') ? 'default' : 'ghost'}
                                    className={isActive('/categories') ? 'bg-gray-200' : ''}
                                >
                                    Categories
                                </Button>
                            </Link>
                            <Link href="/owners">
                                <Button
                                    variant={isActive('/owners') ? 'default' : 'ghost'}
                                    className={isActive('/owners') ? 'bg-gray-200' : ''}
                                >
                                    Owners
                                </Button>
                            </Link>
                            <Link href="/machines">
                                <Button
                                    variant={isActive('/machines') ? 'default' : 'ghost'}
                                    className={isActive('/machines') ? 'bg-gray-200' : ''}
                                >
                                    Machines
                                </Button>
                            </Link>
                        </>
                    )}

                    <Link href="/dashboard/profile">
                        <Button
                            variant={isActive('/dashboard/profile') ? 'default' : 'ghost'}
                            className={isActive('/dashboard/profile') ? 'bg-gray-200' : ''}
                        >
                            Profile
                        </Button>
                    </Link>

                    <Link href="/public">
                        <LogoutButton />
                    </Link>
                </>
            )}
            <ModeToggle />
        </>
    );

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={isAuthenticated() ? "/dashboard" : "/public"} className="font-bold text-3xl">
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













