import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function FirstTimeLoginAlert  ()  {

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check if user has seen the alert before
    const hasSeenAlert = localStorage.getItem('hasSeenAdminCredentials');
    
    if (!hasSeenAlert) {
      setShowAlert(true);
      localStorage.setItem('hasSeenAdminCredentials', 'true');
    }
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  if (!showAlert) return null;
  return (
    <div className="fixed top-4 right-4 z-50 w-96">
      <Alert className="relative bg-white border shadow-lg">
        <AlertTitle className="text-lg font-semibold mb-2">Welcome! Admin Credentials</AlertTitle>
        <AlertDescription className="text-gray-600">
          <p className="mb-2">For testing purposes, you can use these admin credentials:</p>
          <div className="bg-gray-50 p-3 rounded-md mb-3">
            <p className="mb-1"><strong>Email:</strong> admin@gmail.com</p>
            <p><strong>Password:</strong> qwerty1234</p>
          </div>
        </AlertDescription>
        <Button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 h-auto bg-transparent hover:bg-gray-100 text-gray-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  );
};
