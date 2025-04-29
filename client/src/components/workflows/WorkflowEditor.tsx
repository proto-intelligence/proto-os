"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { 
  ReactFlow,
  Background, 
  Controls, 
  MiniMap,
  Panel,
  ReactFlowProvider,
  ConnectionMode,
  MarkerType,
  Node,
  NodeMouseHandler,
  Position,
  NodeTypes
} from '@xyflow/react';
import { useWorkflowStore } from './store';
import { CustomNode } from './CustomNode';
import { BrowserNode } from './BrowserNode';
import { ExternalVendorNode } from './ExternalVendorNode';
import { WorkflowToolbar } from './WorkflowToolbar';
import { NodeMetadataPanel } from './NodeMetadataPanel';
import { TaskType, TaskUrgency } from '@/types/task';
import { useWorkflowsControllerFindOne } from '@/hooks/backend/useWorkflowsControllerFindOne';
import '@xyflow/react/dist/style.css';

interface NodeData extends Record<string, unknown> {
  label: string;
  name: string;
  description: string;
  type: TaskType;
  urgency: TaskUrgency;
  usually_takes: string;
  steps: Record<string, string>;
}

// Define node types with a more specific type
const nodeTypes: NodeTypes = {
  customNode: CustomNode,
  browserNode: BrowserNode as unknown as NodeTypes['browserNode'],
  externalVendorNode: ExternalVendorNode as unknown as NodeTypes['externalVendorNode']
};

interface WorkflowEditorProps {
  workflowId?: string;
}

function WorkflowEditorContent({ workflowId }: WorkflowEditorProps) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteSelectedNodes, updateNodes, updateEdges } = useWorkflowStore();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);

  // Fetch workflow data if workflowId is provided
  const { data: workflowData } = useWorkflowsControllerFindOne(workflowId || '');

  // Update nodes and edges when workflow data is loaded
  useEffect(() => {
    if (workflowData && workflowId) {
      // Convert workflow nodes to ReactFlow nodes
      const flowNodes = (workflowData.nodes || []).map(node => {
        // Extract data from the node's data property
        const nodeData = node.data || {};
        
        return {
          id: node.id,
          type: 'customNode',
          position: { 
            x: node.position_x || 0, 
            y: node.position_y || 0 
          },
          data: {
            label: node.label || 'Task',
            name: nodeData.name || node.label || 'Task',
            description: nodeData.description || '',
            type: nodeData.type || TaskType.ADMINISTRATIVE,
            urgency: nodeData.urgency || TaskUrgency.MEDIUM,
            usually_takes: nodeData.usually_takes || '1 week',
            steps: nodeData.steps || {}
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top
        };
      });

      // Convert workflow edges to ReactFlow edges
      const flowEdges = (workflowData.edges || []).map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: true,
        style: { stroke: '#b1b1b7' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      }));

      // Update the store with the fetched data
      updateNodes(flowNodes);
      updateEdges(flowEdges);
    }
  }, [workflowData, workflowId, updateNodes, updateEdges]);

  const handleDeleteNodes = useCallback(() => {
    deleteSelectedNodes();
  }, [deleteSelectedNodes]);

  const handleNodeDoubleClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode(node as Node<NodeData>);
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={handleNodeDoubleClick}
        fitView
        className="w-full h-full"
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#b1b1b7' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        connectionMode={ConnectionMode.Strict}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-center">
          <WorkflowToolbar
            onDeleteNodes={handleDeleteNodes}
            workflowId={workflowId}
          />
        </Panel>
        <NodeMetadataPanel
          isVisible={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          data={selectedNode?.data || null}
        />
      </ReactFlow>
    </div>
  );
}

export function WorkflowEditor({ workflowId }: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorContent workflowId={workflowId} />
    </ReactFlowProvider>
  );
} 