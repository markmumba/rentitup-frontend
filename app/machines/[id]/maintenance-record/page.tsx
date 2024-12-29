import { ProtectedRoute } from "@/app/protector";
import { owner } from "@/lib/utils";

export default function ProtectedMaintenanceRecordPage() {
  return (
    <ProtectedRoute allowedRoles={owner}>
      <MaintenanceRecordPage />
    </ProtectedRoute>
  );
}

function MaintenanceRecordPage() {
  return <></>;
}
