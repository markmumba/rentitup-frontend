import React from 'react';
import {
  Home,
  User,
  Briefcase,
  Settings,
  Database,
  Wrench,
  FileText,
  Menu
} from 'lucide-react';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { isAdmin, isAuthenticated, isCustomer, isOwner } from '../../lib/service';

const SideNavbar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-lg font-medium">Menu</h3>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col space-y-2 p-4">
          {isAuthenticated() && (
            <>
              <SidebarGroup>
                <a href="/profile" className="flex items-center space-x-2">
                  <User /> <span>Profile</span>
                </a>
              </SidebarGroup>
              {isCustomer() && (
                <>
                  <SidebarGroup>
                    <a href="/categories" className="flex items-center space-x-2">
                      <Briefcase /> <span>Categories</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/home" className="flex items-center space-x-2">
                      <Home /> <span>Home</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/booking-history" className="flex items-center space-x-2">
                      <FileText /> <span>Booking History</span>
                    </a>
                  </SidebarGroup>
                </>
              )}
              {isOwner() && (
                <>
                  <SidebarGroup>
                    <a href="/bookings" className="flex items-center space-x-2">
                      <Briefcase /> <span>Bookings</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/home" className="flex items-center space-x-2">
                      <Home /> <span>Home</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/machines" className="flex items-center space-x-2">
                      <Wrench /> <span>Machines</span>
                    </a>
                  </SidebarGroup>
                </>
              )}
              {isAdmin() && (
                <>
                  <SidebarGroup>
                    <a href="/all-machines" className="flex items-center space-x-2">
                      <Database /> <span>All Machines</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/owners" className="flex items-center space-x-2">
                      <Settings /> <span>Owners</span>
                    </a>
                  </SidebarGroup>
                  <SidebarGroup>
                    <a href="/issues" className="flex items-center space-x-2">
                      <FileText /> <span>Issues</span>
                    </a>
                  </SidebarGroup>
                </>
              )}
            </>
          )}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="p-2 hover:bg-gray-800 rounded-md">
          <Menu />
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNavbar;