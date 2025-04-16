import { Panel } from '@xyflow/react';
import { Badge } from '@/ui';
import { TaskType, TaskUrgency } from '@/types/task';

interface NodeMetadataPanelProps {
  isVisible: boolean;
  onClose: () => void;
  data: {
    name: string;
    description: string;
    type: TaskType;
    urgency: TaskUrgency;
    usually_takes: string;
    steps: Record<string, string>;
  } | null;
}

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

export function NodeMetadataPanel({ isVisible, onClose, data }: NodeMetadataPanelProps) {
  if (!isVisible || !data) return null;

  return (
    <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg border border-neutral-200 w-[320px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">{data.name}</h3>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Badge variant="neutral">{data.type}</Badge>
          <Badge variant={getUrgencyBadgeVariant(data.urgency)}>{data.urgency}</Badge>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-1">Description</h4>
          <p className="text-sm text-neutral-600">{data.description}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-1">Duration</h4>
          <p className="text-sm text-neutral-600">{data.usually_takes}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Steps</h4>
          <div className="space-y-2">
            {Object.entries(data.steps).map(([step, description], index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge variant="neutral" className="shrink-0">{step}</Badge>
                <span className="text-sm text-neutral-600">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
} 