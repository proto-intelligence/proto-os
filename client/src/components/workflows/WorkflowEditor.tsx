"use client";

import React, { useCallback } from 'react';
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
  MarkerType
} from '@xyflow/react';
import { useWorkflowStore } from './store';
import { CustomNode } from './CustomNode';
import { WorkflowToolbar } from './WorkflowToolbar';
import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
  default: CustomNode,
};

function WorkflowEditorContent() {
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect, deleteSelectedNodes } = useWorkflowStore();
  const { screenToFlowPosition } = useReactFlow();

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

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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