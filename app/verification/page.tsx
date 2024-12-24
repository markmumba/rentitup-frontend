// app/verification/page.tsx
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { VerificationClient } from './verificationclient';

export default function VerificationPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerificationClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <div className="mt-4">
          <Skeleton className="h-24 w-full max-w-lg" />
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload Verification Image</CardTitle>
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}