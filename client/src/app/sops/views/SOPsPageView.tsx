"use client";

import { SOPList } from "../components/ui/SOPList";
import { useRouter } from "next/navigation";
import { useWorkflowsControllerCreate } from "@/hooks/backend/useWorkflowsControllerCreate";
import { ProtoToast } from "@/ui/components/ProtoToast";
import { useState } from "react";
import { CreateWorkflowDto } from "@/lib/api/backend/models/CreateWorkflowDto";

export function SOPsPageView() {
  const router = useRouter();
  const { mutate: createWorkflow } = useWorkflowsControllerCreate();
  const [showToast, setShowToast] = useState(false);

  const handleCreateNew = () => {
    const newWorkflow: CreateWorkflowDto = {
      name: "New Workflow",
      description: "A new workflow",
      due_date: "1 week",
      created_by: "System",
      nuance_notes: "",
      tags: [],
      usually_takes: "1 week",
      workflow_type: CreateWorkflowDto.workflow_type.DAG,
      nodes: [],
      edges: [],
      organization_id: "1"
    };

    createWorkflow(
      newWorkflow,
      {
        onSuccess: (response) => {
          router.push(`/workflows/${response.id}`);
        },
        onError: (error) => {
          console.error("Failed to create workflow:", error);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      }
    );
  };

  return (
    <div className="p-6">
      <SOPList onCreateNew={handleCreateNew} />
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <ProtoToast
            title="Error"
            description="Failed to create workflow"
            variant="error"
          />
        </div>
      )}
    </div>
  );
} 