"use client";

import { SOPList } from "../components/ui/SOPList";
import { useRouter } from "next/navigation";

export function SOPsPageView() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/workflows");
  };

  return (
    <div className="p-6">
      <SOPList onCreateNew={handleCreateNew} />
    </div>
  );
} 