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
}

export function CustomNode({ data, layoutDirection }: CustomNodeProps) {
  const nodeData = data as CustomNodeData;
  const [isHovered, setIsHovered] = useState(false);

  const getUrgencyBadgeVariant = (urgency: Task.urgency) => {
    switch (urgency) {
      case Task.urgency.HIGH:
      case Task.urgency.CRITICAL:
        return "error";
      case Task.urgency.MEDIUM:
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        variant="default"
        _default={isHovered ? "hover" : "default"}
        className="w-full"
      />
    </div>
  );
}
