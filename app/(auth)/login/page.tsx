import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginClient } from "./loginclient";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginClient />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-48 mx-auto" />
      </div>
      <div className="max-w-md mx-auto">
        <Skeleton className="h-[300px] w-full" />
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}