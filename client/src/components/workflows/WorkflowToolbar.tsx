import { Button, IconButton } from "@/ui";
import {
  FeatherPlusCircle,
  FeatherTrash,
  FeatherAlignVerticalJustifyStart,
  FeatherAlignHorizontalJustifyStart,
  FeatherSave,
  FeatherInfo,
} from "@subframe/core";
import { ProtoFloatingToolbar } from "@/ui/components/ProtoFloatingToolbar";
import { useWorkflowStore } from "./store";
import { useReactFlow } from "@xyflow/react";
import { Select } from "@/ui/components/Select";
import { useState } from "react";
import { useTasksControllerSearch } from "@/hooks/backend/useTasksControllerSearch";
import { Task } from "@/lib/api/backend/models/Task";
import { useWorkflowsControllerFindOne } from "@/hooks/backend/useWorkflowsControllerFindOne";
import { useWorkflowsControllerUpdate } from "@/hooks/backend/useWorkflowsControllerUpdate";
import { toast } from "sonner";
import { TasksService } from '@/lib/api/backend/services/TasksService';

interface WorkflowToolbarProps {
  onDeleteNodes: () => void;
  workflowId?: string;
  onSaveSuccess?: () => void;
  onWorkflowClick?: () => void;
}

interface TaskOption {
  id: string;
  name: string;
  type: Task.type;
}

export function WorkflowToolbar({
  onDeleteNodes,
  workflowId,
  onSaveSuccess,
  onWorkflowClick,
}: WorkflowToolbarProps) {
  const layoutNodes = useWorkflowStore((state) => state.layoutNodes);
  const setLayoutDirection = useWorkflowStore((state) => state.setLayoutDirection);
  const { nodes, edges } = useWorkflowStore();
  const { fitView, getViewport } = useReactFlow();
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  // Fetch workflow data if workflowId is provided
  const { data: workflowData } = useWorkflowsControllerFindOne(workflowId || '');

  // Fetch tasks from the backend
  const { data: tasksData, isLoading } = useTasksControllerSearch({
    limit: 100,
    sortBy: 'name',
    sortOrder: 'ASC'
  });

  // Get the update mutation hook
  const { mutate: updateWorkflow, isPending: isSaving } = useWorkflowsControllerUpdate();

  // Transform tasks data into options for the dropdown
  const taskOptions = tasksData?.items?.map((task: Task) => ({
    id: task.id,
    name: task.name,
    type: task.type
  })) || [];

  const handleVerticalLayout = () => {
    setLayoutDirection("TB");
    layoutNodes("TB");
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleHorizontalLayout = () => {
    setLayoutDirection("LR");
    layoutNodes("LR");
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleSave = async () => {
    if (!workflowId) {
      toast.error("No workflow ID provided");
      return;
    }

    try {
      // Get the current state from the workflow store
      const { nodes, edges } = useWorkflowStore.getState();

      // Format nodes data properly
      const formattedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
      }));

      // Format edges data properly
      const formattedEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: edge.style,
        markerEnd: edge.markerEnd,
      }));

      updateWorkflow(
        {
          id: workflowId,
          data: {
            nodes: formattedNodes,
            edges: formattedEdges
          }
        },
        {
          onSuccess: () => {
            onSaveSuccess?.();
          },
          onError: (error) => {
            toast.error("Failed to save workflow");
            console.error("Failed to save workflow:", error);
          }
        }
      );
    } catch (error) {
      toast.error("Failed to save workflow");
      console.error("Failed to save workflow:", error);
    }
  };

  const handleAddNode = async () => {
    const { x, y } = getViewport();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const position = {
      x: (centerX - x) / 1,
      y: (centerY - y) / 1,
    };
    
    // Find the selected task from the fetched data
    const selectedTask = taskOptions.find((task: TaskOption) => task.id === selectedTaskId);
    
    if (selectedTask) {
      try {
        // Fetch the full task data
        const taskData = await TasksService.tasksControllerFindOne(selectedTask.id);
        
        if (taskData) {
          useWorkflowStore.getState().addNode({
            ...taskData,
            position,
          });
        }
      } catch (error) {
        console.error('Failed to fetch task data:', error);
      }
    }
  };

  // Get workflow name from the fetched data or use a default
  const workflowName = workflowData?.name || "Untitled Workflow";

  return (
    <ProtoFloatingToolbar
      iconButtonSlots={
        <>
          <IconButton
            size="small"
            icon={<FeatherPlusCircle />}
            onClick={handleAddNode}
          />
          <IconButton
            size="small"
            icon={<FeatherTrash />}
            onClick={onDeleteNodes}
          />
          <IconButton
            size="small"
            icon={<FeatherAlignVerticalJustifyStart />}
            onClick={handleVerticalLayout}
          />
          <IconButton
            size="small"
            icon={<FeatherAlignHorizontalJustifyStart />}
            onClick={handleHorizontalLayout}
          />
          <Button
            variant="brand-secondary"
            size="small"
            icon={<FeatherSave />}
            onClick={handleSave}
            disabled={isSaving || !workflowId}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </>
      }
      taskSearchBar={
        <Select
          label=""
          placeholder={isLoading ? "Loading tasks..." : "Select a task"}
          helpText=""
          value={selectedTaskId}
          onValueChange={(value: string) => setSelectedTaskId(value)}
          disabled={isLoading}
        >
          {taskOptions.map((task: TaskOption) => (
            <Select.Item key={task.id} value={task.id}>
              {task.name}
            </Select.Item>
          ))}
        </Select>
      }
      workflow={
        <Button
          variant="brand-secondary"
          size="medium"
          onClick={onWorkflowClick}
        >
          {workflowName}
        </Button>
      }
    />
  );
}
