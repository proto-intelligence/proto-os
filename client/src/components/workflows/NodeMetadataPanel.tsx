"use client";

import { Panel } from "@xyflow/react";
import { Task } from "@/lib/api/backend/models/Task";
import React, { useState, useEffect } from "react";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX, FeatherTrash, FeatherPlus, FeatherClock, FeatherBookmark, FeatherSave } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Accordion } from "@/ui/components/Accordion";
import { Button } from "@/ui/components/Button";
import { CreateNewTaskComponent } from "@/ui/components/CreateNewTaskComponent";
import { useWorkflowsControllerUpdate } from "@/hooks/backend/useWorkflowsControllerUpdate";
import { useTasksControllerCreate } from "@/hooks/backend/useTasksControllerCreate";
import { CreateTaskDto } from "@/lib/api/backend/models/CreateTaskDto";
import { useWorkflowStore } from "./store";
import { Node } from "@xyflow/react";
import { useClerkData } from "@/hooks/useClerkData";

interface Step {
  name?: string;
  description?: string;
  duration?: string;
  tutorial_link?: string;
}

interface NodeMetadataPanelProps {
  isVisible: boolean;
  onClose: () => void;
  data: Task | null;
  nodeId?: string;
  workflowId?: string;
}

export function NodeMetadataPanel({
  isVisible,
  onClose,
  data,
  nodeId,
  workflowId,
}: NodeMetadataPanelProps) {
  const [editedTask, setEditedTask] = useState<Partial<Task>>(data || {});
  const [steps, setSteps] = useState<Step[]>(Array.isArray(data?.steps) ? data.steps : []);
  const updateWorkflow = useWorkflowsControllerUpdate();
  const createTask = useTasksControllerCreate();
  const { user, organization } = useClerkData();

  useEffect(() => {
    setEditedTask(data || {});
    setSteps(Array.isArray(data?.steps) ? data.steps : []);
  }, [data]);

  if (!isVisible || !data || !nodeId || !workflowId) return null;

  const handleInputChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepChange = (index: number, field: keyof Step, value: string) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = {
        ...newSteps[index],
        [field]: value,
      };
      return newSteps;
    });
  };

  const handleAddStep = () => {
    setSteps((prev) => [...prev, {}]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!workflowId || !nodeId) return;

    try {
      // Get the current workflow state
      const { nodes, edges } = useWorkflowStore.getState();

      // Find the node being edited
      const nodeIndex = nodes.findIndex((node: Node) => node.id === nodeId);
      if (nodeIndex === -1) return;

      // Create updated nodes array with only the modified node's data changed
      const updatedNodes = nodes.map((node: Node, index: number) => {
        if (index === nodeIndex) {
          return {
            ...node,
            data: {
              ...node.data,
              ...editedTask,
              steps: steps,
            }
          };
        }
        return node;
      });

      // Update the workflow with the modified nodes and original edges
      await updateWorkflow.mutateAsync({
        id: workflowId,
        data: {
          nodes: updatedNodes,
          edges: edges
        },
      });

      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleAddToLibrary = async () => {
    try {
      const taskData: CreateTaskDto = {
        name: editedTask.name || data.name,
        description: editedTask.description || data.description,
        type: editedTask.type || data.type,
        urgency: editedTask.urgency || data.urgency,
        usually_takes: editedTask.usually_takes || data.usually_takes,
        steps: steps,
        created_by: editedTask.created_by || data.created_by,
        organization_id: editedTask.organization_id || data.organization_id,
      };

      await createTask.mutateAsync(taskData);
    } catch (error) {
      console.error("Failed to add task to library:", error);
    }
  };

  return (
    <Panel position="top-right" className="w-150 h-[calc(100vh-6rem)] overflow-y-scroll">
      <CreateNewTaskComponent
        headerLabel="Edit Task"
        stepsLabel="Steps"
        icon={<FeatherClock />}
        updatedAt={data?.updated_at ? new Date(data.updated_at).toISOString() : ""}
        header={
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Edit Task
            </span>
            <IconButton
              icon={<FeatherX />}
              onClick={onClose}
            />
          </div>
        }
        taskMeta={
          <>
            <TextField
              className="h-auto w-full flex-none"
              label="Task Name"
              helpText=""
            >
              <TextField.Input
                placeholder="Enter task name"
                value={editedTask.name || ""}
                onChange={(event) => handleInputChange("name", event.target.value)}
              />
            </TextField>
            <TextArea
              className="h-auto w-full flex-none"
              label="Description"
              helpText=""
            >
              <TextArea.Input
                placeholder="Enter task description"
                value={editedTask.description || ""}
                onChange={(event) => handleInputChange("description", event.target.value)}
              />
            </TextArea>
            <div className="flex w-full flex-wrap items-start gap-4">
              <Select
                className="h-auto w-48 flex-none"
                label="Type"
                placeholder=""
                helpText=""
                value={editedTask.type || ""}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <Select.Item value="administrative">administrative</Select.Item>
                <Select.Item value="clinical">clinical</Select.Item>
                <Select.Item value="technical">technical</Select.Item>
              </Select>
              <Select
                className="h-auto w-48 flex-none"
                label="Urgency"
                placeholder=""
                helpText=""
                value={editedTask.urgency || ""}
                onValueChange={(value) => handleInputChange("urgency", value)}
              >
                <Select.Item value="low">low</Select.Item>
                <Select.Item value="medium">medium</Select.Item>
                <Select.Item value="high">high</Select.Item>
                <Select.Item value="critical">critical</Select.Item>
              </Select>
              <TextField
                className="h-auto w-48 flex-none"
                label="Usually Takes"
                helpText=""
              >
                <TextField.Input
                  placeholder="e.g. 2 hours"
                  value={editedTask.usually_takes || ""}
                  onChange={(event) => handleInputChange("usually_takes", event.target.value)}
                />
              </TextField>
            </div>
          </>
        }
        taskSteps={
          <>
            <span className="text-heading-3 font-heading-3 text-default-font">
              Steps
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              {steps.map((step, index) => (
                <Accordion
                  key={index}
                  trigger={
                    <div className="flex w-full items-center gap-2 px-4 py-3">
                      <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                        {step.name || `Step ${index + 1}`}
                      </span>
                      <Accordion.Chevron />
                    </div>
                  }
                  defaultOpen={true}
                >
                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md bg-neutral-50 px-4 py-4">
                    <TextField
                      className="h-auto w-full flex-none"
                      label="Step Name"
                      helpText=""
                    >
                      <TextField.Input
                        placeholder="Enter step name"
                        value={step.name || ""}
                        onChange={(event) => handleStepChange(index, "name", event.target.value)}
                      />
                    </TextField>
                    <TextArea
                      className="h-auto w-full flex-none"
                      label="Step Description"
                      helpText=""
                    >
                      <TextArea.Input
                        placeholder="Enter step description"
                        value={step.description || ""}
                        onChange={(event) => handleStepChange(index, "description", event.target.value)}
                      />
                    </TextArea>
                    <div className="flex w-full items-start gap-4">
                      <TextField
                        className="h-auto w-48 flex-none"
                        label="Duration (Optional)"
                        helpText=""
                      >
                        <TextField.Input
                          placeholder="e.g. 30 minutes"
                          value={step.duration || ""}
                          onChange={(event) => handleStepChange(index, "duration", event.target.value)}
                        />
                      </TextField>
                      <TextField
                        className="grow"
                        label="Tutorial Video Link (Optional)"
                        helpText=""
                      >
                        <TextField.Input
                          placeholder="Enter video URL"
                          value={step.tutorial_link || ""}
                          onChange={(event) => handleStepChange(index, "tutorial_link", event.target.value)}
                        />
                      </TextField>
                    </div>
                    <div className="flex w-full items-start justify-end">
                      <IconButton
                        variant="destructive-tertiary"
                        icon={<FeatherTrash />}
                        onClick={() => handleRemoveStep(index)}
                      />
                    </div>
                  </div>
                </Accordion>
              ))}
              <Button
                variant="neutral-tertiary"
                icon={<FeatherPlus />}
                onClick={handleAddStep}
              >
                Add Step
              </Button>
            </div>
          </>
        }
        taskUpdatedStatus={
          <>
            <FeatherClock className="text-caption font-caption text-subtext-color" />
            <span className="text-caption font-caption text-subtext-color">
              Last updated: {new Date(data.updated_at).toLocaleString()}
            </span>
          </>
        }
        footer={
          <>
            <div className="flex w-full items-center border-t border-solid border-neutral-border" />
            <div className="flex w-full items-center justify-between">
              <Button
                variant="brand-secondary"
                icon={<FeatherBookmark />}
                onClick={handleAddToLibrary}
                disabled={createTask.isPending}
              >
                {createTask.isPending ? "Adding..." : "Add to Tasks Library"}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="neutral-secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  icon={<FeatherSave />}
                  onClick={handleSave}
                  disabled={updateWorkflow.isPending}
                >
                  {updateWorkflow.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </>
        }
      />
    </Panel>
  );
} 
