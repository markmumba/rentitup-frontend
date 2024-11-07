import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isAdmin, isAuthenticated, isCustomer, isOwner } from '../lib/service';

export function Navbar() {
    return (
        <div className="flex items-center mx-10 justify-between px-4 py-3 border-b bg-background">
            <div className="flex items-center space-x-4">
                <Link href="/" className="font-bold text-3xl">
                    Rentitup
                </Link>
            </div>
            <div className="flex items-center space-x-4 ">

                <Link href="/login">
                    <Button variant="default" >Login</Button>
                </Link>
                <Link href="/register">
                    <Button variant="ghost">Register</Button>
                </Link>
                {isAuthenticated() &&
                    <>
                        {isCustomer() &&
                            <>
                                <Link href="/book">
                                    <Button variant="ghost">Categories</Button>
                                </Link>

                                <Link href="/book">
                                    <Button variant="ghost">Book</Button>
                                </Link>
                            </>
                        }

                        {isOwner() &&
                            <>
                                <Link href="/book">
                                    <Button variant="ghost">Orders</Button>
                                </Link>
                            </>

                        }
                        {isAdmin() &&
                            <>
                                <Link href="/owners">
                                    <Button variant="ghost">Owners</Button>
                                </Link>
                                <Link href="/machines">
                                    <Button variant="ghost">Machines</Button>
                                </Link>
                            </>
                        }
                        <Link href="/owners">
                            <Button variant="ghost">Profile</Button>
                        </Link>
                    </>
                }
            </div>
        </div>
    );
}