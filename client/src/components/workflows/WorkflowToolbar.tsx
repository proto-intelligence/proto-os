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

interface WorkflowToolbarProps {
  onAddNode: () => void;
  onDeleteNodes: () => void;
}

export function WorkflowToolbar({
  onAddNode,
  onDeleteNodes,
}: WorkflowToolbarProps) {
  const layoutNodes = useWorkflowStore((state) => state.layoutNodes);
  const { nodes, edges } = useWorkflowStore();
  const { fitView } = useReactFlow();

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

  return (
    <ProtoFloatingToolbar
      iconButtonSlots={
        <>
          <IconButton
            size="small"
            icon={<FeatherPlusCircle />}
            onClick={onAddNode}
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
    />
  );
}
