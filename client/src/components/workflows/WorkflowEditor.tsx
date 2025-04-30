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
import { WorkflowToolbar } from './WorkflowToolbar';
import { NodeMetadataPanel } from './NodeMetadataPanel';
import { TaskType, TaskUrgency } from '@/types/task';
import { useWorkflowsControllerFindOne } from '@/hooks/backend/useWorkflowsControllerFindOne';
import '@xyflow/react/dist/style.css';
import { useQueryClient } from '@tanstack/react-query';

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
  customNode: CustomNode
};

interface WorkflowEditorProps {
  workflowId?: string;
}

function WorkflowEditorContent({ workflowId }: WorkflowEditorProps) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteSelectedNodes, updateNodes, updateEdges } = useWorkflowStore();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const queryClient = useQueryClient();

  // Fetch workflow data if workflowId is provided
  const { data: workflowData } = useWorkflowsControllerFindOne(workflowId || '');

  // Update nodes and edges when workflow data is loaded
  useEffect(() => {
    if (workflowData && workflowId) {
      try {
        // Parse nodes from the workflow data
        const parsedNodes = workflowData.nodes.map(node => {
          const nodeData = typeof node === 'string' ? JSON.parse(node) : node;
          return {
            id: nodeData.id,
            type: 'customNode',
            position: nodeData.position,
            data: {
              label: nodeData.data?.label || 'Task',
              name: nodeData.data?.name || 'Task',
              description: nodeData.data?.description || '',
              type: nodeData.data?.type || TaskType.ADMINISTRATIVE,
              urgency: nodeData.data?.urgency || TaskUrgency.MEDIUM,
              usually_takes: nodeData.data?.usually_takes || '1 week',
              steps: nodeData.data?.steps || {}
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top
          };
        });

        // Parse edges from the workflow data
        const parsedEdges = workflowData.edges.map(edge => {
          const edgeData = typeof edge === 'string' ? JSON.parse(edge) : edge;
          return {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            animated: true,
            style: { stroke: '#b1b1b7' },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            }
          };
        });

        // Update the store with the parsed data
        updateNodes(parsedNodes);
        updateEdges(parsedEdges);
      } catch (error) {
        console.error('Error parsing workflow data:', error);
      }
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