import { Handle, Position, NodeProps } from "@xyflow/react";
import { ProtoManualTask } from "@/ui/components/ProtoManualTask";
import { Badge } from "@/ui";
import { TaskType, TaskUrgency } from "@/types/task";

interface CustomNodeData {
  label: string;
  name: string;
  description: string;
  type: TaskType;
  urgency: TaskUrgency;
  usually_takes: string;
  steps: Record<string, string>;
}

const defaultNodeData: CustomNodeData = {
  label: "Task",
  name: "New Task",
  description: "This is a default task description",
  type: TaskType.ADMINISTRATIVE,
  urgency: TaskUrgency.MEDIUM,
  usually_takes: "1 week",
  steps: {
    "Step 1": "Initial planning",
    "Step 2": "Implementation",
    "Step 3": "Review",
  },
};

export function CustomNode({ data }: NodeProps) {
  const nodeData = { ...defaultNodeData, ...data } as CustomNodeData;

  const getUrgencyBadgeVariant = (urgency: TaskUrgency) => {
    switch (urgency) {
      case TaskUrgency.HIGH:
      case TaskUrgency.CRITICAL:
        return "error";
      case TaskUrgency.MEDIUM:
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <ProtoManualTask
        mainSlot={
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold">{nodeData.label}</div>
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
        className="w-full"
      />
      <Handle type="source" position={Position.Bottom} isConnectable={true} />
    </div>
  );
}
