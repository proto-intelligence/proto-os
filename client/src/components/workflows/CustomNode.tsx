import { Handle, Position, NodeProps } from '@xyflow/react';
import { ProtoTaskType } from '@/ui/components/ProtoTaskType';
import { Avatar } from '@/ui';
import { TextField } from '@/ui';
import { Badge } from '@/ui';

type CustomNodeData = {
  label: string;
  name?: string;
  title?: string;
  description?: string;
  status?: string;
}

export function CustomNode({ data }: NodeProps) {
  const nodeData = data as CustomNodeData;
  
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-neutral-400"
        isConnectable={true}
      />
      <ProtoTaskType
        headerSlot={
          <div className="flex items-center gap-2">
            <Avatar size="small" />
            <div className="flex flex-col gap-1">
              <TextField.Input
                placeholder="Name"
                value={nodeData.name}
                className="text-sm font-medium"
              />
              <TextField.Input
                placeholder="Title"
                value={nodeData.title}
                className="text-xs text-neutral-500"
              />
            </div>
          </div>
        }
        footerSlot={
          <div className="flex flex-col gap-2">
            <TextField.Input
              placeholder="Description"
              value={nodeData.description}
              className="text-sm"
            />
            <Badge variant="neutral">
              {nodeData.status || 'New'}
            </Badge>
          </div>
        }
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-neutral-400"
        isConnectable={true}
      />
    </div>
  );
} 