"use client";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Table } from "@/ui/components/Table";
import { useWorkflowsControllerSearch } from "@/hooks/backend/useWorkflowsControllerSearch";
import { useWorkflowsControllerRemove } from "@/hooks/backend/useWorkflowsControllerRemove";
import { useState } from "react";
import { Workflow } from "@/lib/api/backend/models/Workflow";
import { FeatherSearch, FeatherTrash2 } from "@subframe/core";
import { useRouter } from "next/navigation";
import { useClerkData } from "@/hooks/useClerkData";

interface WorkflowListProps {
  onCreateNew: () => void;
}

export function SOPList({ onCreateNew }: WorkflowListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { organization, isLoaded: isClerkLoaded } = useClerkData();
  const { mutate: deleteWorkflow } = useWorkflowsControllerRemove();

  const { data, isLoading, refetch } = useWorkflowsControllerSearch({
    search: searchQuery,
    page: 1,
    limit: 10,
    organizationId: organization?.id
  });

  const workflows = data?.items || [];

  const handleRowClick = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`);
  };

  const handleDelete = (e: React.MouseEvent, workflowId: string) => {
    e.stopPropagation(); // Prevent row click when clicking delete
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      deleteWorkflow(workflowId, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };

  if (isLoading || !isClerkLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Workflows
        </h2>
        <Button onClick={onCreateNew}>Create New Workflow</Button>
      </div>

      <div className="w-full max-w-md">
        <TextField
          disabled={false}
          error={false}
          variant="outline"
          label=""
          helpText=""
          icon={<FeatherSearch />}
          iconRight={null}
        >
          <TextField.Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
          />
        </TextField>
      </div>

      <div className="mt-6">
        {workflows.length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            No workflows found matching your criteria.
          </div>
        ) : (
          <Table>
            <Table.HeaderRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.HeaderRow>
            {workflows.map((workflow: Workflow) => (
              <Table.Row 
                key={workflow.id}
                onClick={() => handleRowClick(workflow.id)}
                className="cursor-pointer hover:bg-neutral-50"
              >
                <Table.Cell>
                  <div className="font-medium">{workflow.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm text-neutral-600">{workflow.description}</div>
                </Table.Cell>
                <Table.Cell>{workflow.workflow_type}</Table.Cell>
                <Table.Cell>{workflow.updated_at}</Table.Cell>
                <Table.Cell>
                  <Button
                    variant="neutral-tertiary"
                    size="small"
                    onClick={(e) => handleDelete(e, workflow.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FeatherTrash2 className="w-4 h-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
} 