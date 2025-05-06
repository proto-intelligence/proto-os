import { Handle, Position, NodeProps } from "@xyflow/react";
import { ProtoManualTask } from "@/ui/components/ProtoManualTask";
import { Badge } from "@/ui";
import { Task } from "@/lib/api/backend/models/Task";
import { useState } from "react";

type CustomNodeData = Task & {
  position: { x: number; y: number };
};

interface CustomNodeProps extends NodeProps {
  layoutDirection: 'TB' | 'LR';
  isSelected?: boolean;
}

export function CustomNode({ data, layoutDirection, isSelected = false }: CustomNodeProps) {
  const nodeData = data as CustomNodeData;
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
      case 'critical':
        return "error";
      case 'medium':
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {layoutDirection === 'TB' ? (
        <>
          <Handle type="target" position={Position.Top} isConnectable={true} />
          <Handle type="source" position={Position.Bottom} isConnectable={true} />
        </>
      ) : (
        <>
          <Handle type="target" position={Position.Left} isConnectable={true} />
          <Handle type="source" position={Position.Right} isConnectable={true} />
        </>
      )}
      <ProtoManualTask
        mainSlot={
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold">{nodeData.name}</div>
              <Badge variant={getUrgencyBadgeVariant(nodeData.urgency)}>
                {nodeData.urgency}
              </Badge>
            </div>
            <div className="text-sm font-medium">{nodeData.name}</div>
            <div className="text-xs text-gray-500 mb-2">{nodeData.description}</div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Type:</span> {nodeData.type}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Usually takes:</span> {nodeData.usually_takes}
            </div>
          </div>
        }
        _default={isSelected ? "pressed" : isPressed ? "pressed" : isHovered ? "hover" : "default"}
        className="w-full"
      />
    </div>
  );
}
