import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from "./flow/avatar";
import { Input } from "./flow/input";

type CustomNodeData = {
  label: string;
  type: 'default' | 'success' | 'warning';
};

export default function CustomNode({ data, selected }: NodeProps<Node<CustomNodeData>>) {
  const nodeColor = nodeColors[data.type] || nodeColors.default;
  
  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 ${nodeColor} ${selected ? 'border-blue-500' : 'border-stone-400'}`}>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input 
          className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
          value={data.label}
          onChange={() => {
            // We'll handle the update in the parent component
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

const nodeColors = {
  default: 'bg-white',
  success: 'bg-green-100',
  warning: 'bg-yellow-100'
} as const; 