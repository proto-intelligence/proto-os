import { Handle, Position, NodeProps } from '@xyflow/react';
import { ProtoTaskType } from '@/ui/components/ProtoTaskType';
import { Avatar } from '@/ui';
import { Badge } from '@/ui';
import { TaskType, TaskUrgency } from '@/types/task';

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
  label: 'Task',
  name: 'New Task',
  description: 'This is a default task description',
  type: TaskType.ADMINISTRATIVE,
  urgency: TaskUrgency.MEDIUM,
  usually_takes: '1 week',
  steps: {
    'Step 1': 'Initial planning',
    'Step 2': 'Implementation',
    'Step 3': 'Review'
  },
};

export function CustomNode({ data }: NodeProps) {
  const nodeData = { ...defaultNodeData, ...data } as CustomNodeData;
  
  const getUrgencyBadgeVariant = (urgency: TaskUrgency) => {
    switch (urgency) {
      case TaskUrgency.HIGH:
      case TaskUrgency.CRITICAL:
        return 'error';
      case TaskUrgency.MEDIUM:
        return 'warning';
      default:
        return 'neutral';
    }
  };
  
  return (
    <div className="relative w-[280px] border border-neutral-200 rounded-lg bg-white overflow-hidden">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
      />
      <ProtoTaskType
        className="p-3"
        headerSlot={
          <div className="flex items-center gap-2 mb-3">
            <Avatar size="small" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium mb-1.5 text-neutral-900">
                {nodeData.name}
              </h3>
              <div className="flex items-center gap-1.5">
                <Badge variant="neutral" className="text-xs">{nodeData.type}</Badge>
                <Badge variant={getUrgencyBadgeVariant(nodeData.urgency)} className="text-xs">
                  {nodeData.urgency}
                </Badge>
              </div>
            </div>
          </div>
        }
        mainSlot={
          <div className="space-y-2">
            <p className="text-sm text-neutral-700">
              {nodeData.description}
            </p>
            <p className="text-sm text-neutral-500">
              Usually takes: {nodeData.usually_takes}
            </p>
          </div>
        }
        footerSlot={
          <div className="space-y-2 mt-3">
            {Object.entries(nodeData.steps).map(([step, description], index) => (
              <div key={index} className="flex items-start gap-1.5">
                <Badge variant="neutral" className="text-xs shrink-0">{step}</Badge>
                <span className="text-xs text-neutral-500 break-words">{description}</span>
              </div>
            ))}
          </div>
        }
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={true}
      />
    </div>
  );
} 