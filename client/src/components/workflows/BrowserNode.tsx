import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { ProtoBrowserTask } from '@/ui/components/ProtoBrowserTask';
import { TaskType } from '@/types/task';

interface BrowserNodeData {
  label: string;
  name: string;
  description: string;
  type: TaskType;
  usually_takes: string;
  steps: Record<string, string>;
}

const BrowserNodeComponent = ({ data }: NodeProps<BrowserNodeData>) => {
  const nodeData = data as BrowserNodeData;
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <ProtoBrowserTask
        headerSlot={
          <div className="text-sm font-medium">{nodeData.label}</div>
        }
        mainSlot={
          <div className="px-4 py-2">
            <div className="text-xs text-neutral-500">{nodeData.description}</div>
            <div className="mt-2 text-xs">
              <span className="font-medium">Usually takes:</span> {nodeData.usually_takes}
            </div>
          </div>
        }
        footerSlot={
          <div className="text-xs">
            {Object.entries(nodeData.steps).map(([key, value], index) => (
              <div key={key} className={index > 0 ? 'mt-2' : ''}>
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        }
      />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export const BrowserNode = memo(BrowserNodeComponent); 