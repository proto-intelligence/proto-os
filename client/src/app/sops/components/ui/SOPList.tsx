import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Table } from "@/ui/components/Table";
import { useWorkflowsControllerSearch } from "@/hooks/backend/useWorkflowsControllerSearch";
import { useState } from "react";
import { Workflow } from "@/lib/api/backend/models/Workflow";
import { FeatherSearch } from "@subframe/core";

interface WorkflowListProps {
  onCreateNew: () => void;
}

export function SOPList({ onCreateNew }: WorkflowListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data, isLoading } = useWorkflowsControllerSearch({
    search: searchQuery,
    page: 1,
    limit: 10,
  });

  const workflows = data?.items || [];

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
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : workflows.length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            No workflows found matching your criteria.
          </div>
        ) : (
          <Table>
            <Table.HeaderRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Created By</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
            </Table.HeaderRow>
            {workflows.map((workflow: Workflow) => (
              <Table.Row key={workflow.id}>
                <Table.Cell>
                  <div className="font-medium">{workflow.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm text-neutral-600">{workflow.description}</div>
                </Table.Cell>
                <Table.Cell>{workflow.workflow_type}</Table.Cell>
                <Table.Cell>{workflow.created_by}</Table.Cell>
                <Table.Cell>{workflow.updated_at}</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
} 