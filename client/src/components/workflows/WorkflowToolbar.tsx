import { Button, IconButton } from "@/ui";
import {
  FeatherPlusCircle,
  FeatherTrash,
  FeatherAlignVerticalJustifyStart,
  FeatherAlignHorizontalJustifyStart,
  FeatherSave,
} from "@subframe/core";
import { ProtoFloatingToolbar } from "@/ui/components/ProtoFloatingToolbar";
import { useWorkflowStore } from "./store";
import { useReactFlow } from "@xyflow/react";
import { Select } from "@/ui/components/Select";
import { useState } from "react";

// Mock task types for the dropdown
const taskTypes = [
  { value: "administrative", label: "Administrative Task" },
  { value: "clinical", label: "Clinical Task" },
  { value: "research", label: "Research Task" },
  { value: "emergency", label: "Emergency Task" },
  { value: "routine", label: "Routine Task" },
];

interface WorkflowToolbarProps {
  onDeleteNodes: () => void;
}

export function WorkflowToolbar({
  onDeleteNodes,
}: WorkflowToolbarProps) {
  const layoutNodes = useWorkflowStore((state) => state.layoutNodes);
  const { nodes, edges } = useWorkflowStore();
  const { fitView, getViewport } = useReactFlow();
  const [selectedTaskType, setSelectedTaskType] = useState<string>("administrative");

  const handleVerticalLayout = () => {
    layoutNodes("TB"); // Top to Bottom layout
    // Wait for the next frame to ensure nodes are updated
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleHorizontalLayout = () => {
    layoutNodes("LR"); // Left to Right layout
    // Wait for the next frame to ensure nodes are updated
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleSave = async () => {
    try {
      const workflowData = {
        nodes,
        edges,
        timestamp: new Date().toISOString(),
      };

      await navigator.clipboard.writeText(
        JSON.stringify(workflowData, null, 2)
      );
      // You might want to add a toast notification here to indicate success
    } catch (error) {
      console.error("Failed to copy workflow data:", error);
      // You might want to add a toast notification here to indicate failure
    }
  };

  const handleAddNode = () => {
    // Get the current viewport center
    const { x, y } = getViewport();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Convert screen coordinates to flow coordinates
    const position = {
      x: (centerX - x) / 1,
      y: (centerY - y) / 1,
    };
    
    // Get the selected task type label
    const selectedTask = taskTypes.find(task => task.value === selectedTaskType);
    const taskLabel = selectedTask ? selectedTask.label : "Task";
    
    // Call the store's addNode function with the selected task type
    useWorkflowStore.getState().addNode(taskLabel, position);
  };

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
          >
            Save
          </Button>
        </>
      }
      taskSearchBar={
        <Select
          label=""
          placeholder="Select task type"
          helpText=""
          value={selectedTaskType}
          onValueChange={(value: string) => setSelectedTaskType(value)}
        >
          {taskTypes.map((task) => (
            <Select.Item key={task.value} value={task.value}>
              {task.label}
            </Select.Item>
          ))}
        </Select>
      }
    />
  );
}
