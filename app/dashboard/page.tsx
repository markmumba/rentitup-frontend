
'use client';
import { useEffect, useState } from "react";
import { getLoggedUserProfile, isAdmin, isAuthenticated, isCustomer, isOwner } from "../lib/service"
import { UserDetails } from "../lib/definitions";
import { CustomerDetails } from "../ui/Dashboard/Customer/userdetails";


export default function Dashboard() {
    
    return (

        <>
        {isAuthenticated() && (
            <>
            {isCustomer() && (
                <>
                <CustomerDetails />
                </>
            )}
            
            {isOwner() && (
                <>
                /** owners dashboard */
                </>
            )}
            {isAdmin() && (
                <>
                /** admin dashboard */
                </>
            )}
            </>
        )}
        </>
    )
}