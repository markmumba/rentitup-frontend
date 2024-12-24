// app/machines/page.tsx
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { MachinesContent } from './machineclient';

export default function MachinesPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <MachinesContent />
    </Suspense>
  );
}