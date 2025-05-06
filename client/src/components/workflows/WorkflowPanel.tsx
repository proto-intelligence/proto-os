"use client";

import React, { useState } from "react";
import { Workflow } from "@/lib/api/backend/models/Workflow";
import { Button } from "@/ui";
import { Panel } from "@xyflow/react";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Badge } from "@/ui/components/Badge";
import { FeatherTag, FeatherPlus, FeatherX } from "@subframe/core";
import { Select } from "@/ui/components/Select";
import { useWorkflowsControllerUpdate } from "@/hooks/backend/useWorkflowsControllerUpdate";
import { EditWorkflowPanel } from "@/ui/components/EditWorkflowPanel";
import { IconButton } from "@/ui/components/IconButton";
import { useClerkData } from "@/hooks/useClerkData";
import { Avatar } from "@/ui/components/Avatar";

interface WorkflowPanelProps {
  workflow: Workflow | null;
  onClose: () => void;
}

export function WorkflowPanel({ workflow, onClose }: WorkflowPanelProps) {
  const [editedWorkflow, setEditedWorkflow] = useState<Partial<Workflow>>(workflow || {});
  const [newTag, setNewTag] = useState("");
  const updateWorkflow = useWorkflowsControllerUpdate();
  const { user, organization } = useClerkData();

  if (!workflow) return null;

  const handleInputChange = (field: keyof Workflow, value: string) => {
    setEditedWorkflow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedWorkflow.tags?.includes(newTag.trim())) {
      setEditedWorkflow((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedWorkflow((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleSave = async () => {
    if (!workflow.id) return;
    
    try {
      // Ensure we're sending all required fields
      const updateData = {
        ...editedWorkflow,
        id: workflow.id,
        name: editedWorkflow.name || workflow.name,
        description: editedWorkflow.description || workflow.description,
        workflow_type: editedWorkflow.workflow_type || workflow.workflow_type,
        due_date: editedWorkflow.due_date || workflow.due_date,
        created_by: editedWorkflow.created_by || workflow.created_by,
        organization_id: editedWorkflow.organization_id || workflow.organization_id,
        nuance_notes: editedWorkflow.nuance_notes || workflow.nuance_notes,
        usually_takes: editedWorkflow.usually_takes || workflow.usually_takes,
        tags: editedWorkflow.tags || workflow.tags,
        nodes: editedWorkflow.nodes || workflow.nodes,
        edges: editedWorkflow.edges || workflow.edges,
      };

      await updateWorkflow.mutateAsync({
        id: workflow.id,
        data: updateData,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update workflow:", error);
    }
  };

  return (
    <Panel position="top-left" className="w-full h-[calc(100vh-12rem)] overflow-y-scroll">
      <EditWorkflowPanel
        text="Edit Workflow"
        text2="Update workflow details and configuration"
        text3="Tags"
        header={
          <>
            <span className="text-heading-2 font-heading-2 text-default-font">
              Edit Workflow
            </span>
            <IconButton
              icon={<FeatherX />}
              onClick={onClose}
            />
          </>
        }
        main={
          <>

            <TextField
              className="h-auto w-full flex-none"
              label="Name"
              helpText=""
            >
              <TextField.Input
                placeholder="Enter workflow name"
                value={editedWorkflow.name || ""}
                onChange={(event) => handleInputChange("name", event.target.value)}
              />
            </TextField>
                          <TextField
                className="h-auto w-full flex-none"
                label="Created By"
                helpText="The user who created this workflow"
              >
                <div className="flex items-center h-full gap-2">
                  <Avatar
                    image={user?.imageUrl}
                    size="small"
                  />
                  <div className="text-sm text-gray-600">
                    {user?.fullName || "User"}
                  </div>
                </div>
              </TextField>
            <TextArea
              className="h-auto w-full flex-none"
              label="Description"
              helpText="Provide a clear description of the workflow"
            >
              <TextArea.Input
                placeholder="Enter workflow description"
                value={editedWorkflow.description || ""}
                onChange={(event) => handleInputChange("description", event.target.value)}
              />
            </TextArea>
            <TextField
              className="h-auto w-full flex-none"
              label="Due Date"
              helpText=""
            >
              <TextField.Input
                type="date"
                placeholder="Select due date"
                value={editedWorkflow.due_date || ""}
                onChange={(event) => handleInputChange("due_date", event.target.value)}
              />
            </TextField>
            <TextArea
              className="h-auto w-full flex-none"
              label="Nuance Notes"
              helpText="Add any specific notes or considerations"
            >
              <TextArea.Input
                placeholder="Enter additional notes"
                value={editedWorkflow.nuance_notes || ""}
                onChange={(event) => handleInputChange("nuance_notes", event.target.value)}
              />
            </TextArea>
            <TextField
              className="h-auto w-full flex-none"
              label="Usually Takes"
              helpText=""
            >
              <TextField.Input
                placeholder="Enter typical duration"
                value={editedWorkflow.usually_takes || ""}
                onChange={(event) => handleInputChange("usually_takes", event.target.value)}
              />
            </TextField>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Tags
              </span>
              <div className="flex w-full flex-wrap items-start gap-2">
                {editedWorkflow.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="neutral"
                    icon={<FeatherTag />}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                <div className="flex items-center gap-2">
                  <TextField.Input
                    placeholder="Add new tag"
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                    className="w-32"
                  />
                  <Button
                    variant="neutral-tertiary"
                    size="small"
                    icon={<FeatherPlus />}
                    onClick={handleAddTag}
                  >
                    Add Tag
                  </Button>
                </div>
              </div>
            </div>
            <Select
              className="h-auto w-full flex-none"
              label="Workflow Type"
              placeholder="Select workflow type"
              helpText=""
              value={editedWorkflow.workflow_type}
              onValueChange={(value) => handleInputChange("workflow_type", value)}
            >
              <Select.Item value="dag">DAG</Select.Item>
              <Select.Item value="acyclic">ACYCLIC</Select.Item>
              <Select.Item value="cron">CRON</Select.Item>
            </Select>
          </>
        }
        footer={
          <>
            <Button
              variant="neutral-secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateWorkflow.isPending}
            >
              {updateWorkflow.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </>
        }
        workflowName="Edit Workflow"
      />
    </Panel>
  );
}
