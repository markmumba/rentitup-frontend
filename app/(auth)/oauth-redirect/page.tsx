
import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { OAuthRedirectClient } from './oauthclient';

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <OAuthRedirectClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[300px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">
            Completing your sign in...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}