"use client";

import React, { useCallback, useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { ReactFlow, Background, Controls, MiniMap, Panel, useNodesState, useEdgesState, addEdge, Connection, Edge, Node, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/flow/select";

type CustomNodeData = {
  label: string;
  type: 'default' | 'success' | 'warning';
};

const initialNodes: Node<CustomNodeData, 'custom'>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1', type: 'default' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 200, y: 100 },
    data: { label: 'Node 2', type: 'success' },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

function Flow() {
  const { addNodes, deleteElements } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedType, setSelectedType] = useState<CustomNodeData['type']>('default');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Remove double-click deletion
  }, []);

  const addNewNode = useCallback(() => {
    const newNode: Node<CustomNodeData, 'custom'> = {
      id: `${Date.now()}`, // Use timestamp for unique IDs
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}`, type: selectedType },
    };
    setNodes((nds) => [...nds, newNode]); // Use setNodes to preserve existing nodes
  }, [nodes.length, setNodes, selectedType]);

  const deleteSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter(node => node.selected);
    if (selectedNodes.length > 0) {
      deleteElements({ nodes: selectedNodes });
    }
  }, [nodes, deleteElements]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-center" className="flex gap-2">
          <Select value={selectedType} onValueChange={(value: CustomNodeData['type']) => setSelectedType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select node type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Node</SelectItem>
              <SelectItem value="success">Success Node</SelectItem>
              <SelectItem value="warning">Warning Node</SelectItem>
            </SelectContent>
          </Select>
          <button 
            onClick={addNewNode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Node
          </button>
          <button 
            onClick={deleteSelectedNodes}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </Panel>
        <Background bgColor="#111827" />
        <Controls />
        <MiniMap nodeStrokeWidth={3} bgColor="#111827" nodeColor="#ffffff"/>
      </ReactFlow>
    </div>
  );
}

export default function HomePageClient() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </DefaultPageLayout>
  );
}