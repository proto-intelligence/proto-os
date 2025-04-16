"use client";

import React, { useCallback, useState } from 'react';
import { 
  ReactFlow,
  Background, 
  Controls, 
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  NodeTypes,
  ConnectionMode,
  MarkerType,
  Node,
  NodeMouseHandler
} from '@xyflow/react';
import { useWorkflowStore } from './store';
import { CustomNode } from './CustomNode';
import { WorkflowToolbar } from './WorkflowToolbar';
import { NodeMetadataPanel } from './NodeMetadataPanel';
import { TaskType, TaskUrgency } from '@/types/task';
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

const nodeTypes: NodeTypes = {
  customNode: CustomNode,
};

function WorkflowEditorContent() {
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect, deleteSelectedNodes } = useWorkflowStore();
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);

  const handleAddNode = useCallback(() => {
    // Get the center of the viewport
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    addNode("Task", position);
  }, [screenToFlowPosition, addNode]);

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
            onAddNode={handleAddNode}
            onDeleteNodes={handleDeleteNodes}
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

export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <WorkflowEditorContent />
    </ReactFlowProvider>
  );
} 