'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../../lib/store';
import { usePathname } from 'next/navigation';
import { MotionDiv } from '@/components/motion';
import Image from 'next/image';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const token = useAuthStore(state => state.token);
    const role = useAuthStore(state => state.role);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link href={href}>
            <Button
                variant="ghost"
                className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive(href) ?
                        "text-orange-500 dark:text-orange-400" :
                        "text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform hover:after:scale-x-100"
                )}
            >
                {children}
            </Button>
        </Link>
    );

    const NavLinks = () => (
        <>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/commitment">Our commitment</NavItem>
            <NavItem href="/categories">Categories</NavItem>
            <NavItem href="/login">Login</NavItem>

            <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-white ml-2"
            >
                <Link href="/register">Get Started</Link>
            </Button>
        </>
    );

    return (
        <MotionDiv
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-10",
                scrolled ?
                    "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md" :
                    "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                    >
                        <Image 
                        src="/icons/1.png"
                        alt="Comany logo"
                        height={200}
                        width={200}
                         />
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        <NavLinks />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {isOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col space-y-3">
                            <NavLinks />
                        </div>
                    </div>
                )}
            </div>
        </MotionDiv>
    );
}

export default Navbar;