'use client'
import { CategoryResponse } from "@/lib/definitions";
import { getCategoryById } from "@/lib/service";
import { MachineListCard } from "@/components/custom-ui/machines/machineListCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";



export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.id as string;
  
    const [category, setCategory] = useState<CategoryResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  
    async function getCategory() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCategoryById(categoryId);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      getCategory();
    }, []);
  
    if (isLoading) {
      return (
        <div className="space-y-6 p-6">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[200px]" />
            ))}
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <Alert variant="destructive" className="m-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }
  
    return (
      <div className="p-6 space-y-6">
        {category && (
          <>
            <div className="space-y-2 mx-10">
              <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
              <p className="text-muted-foreground ">{category.description}</p>
              <p className="text-muted-foreground">
                Pricing type : 
              <Badge variant="secondary">{category.priceCalculationType}</Badge>
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.machines.map((machine) => (
                <MachineListCard key={machine.id} machine={machine} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  