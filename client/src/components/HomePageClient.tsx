"use client";

import React, { useCallback, useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { ReactFlow, Background, Controls, MiniMap, Panel, useNodesState, useEdgesState, addEdge, Connection, Edge, Node, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/flow/select";
import dagre from '@dagrejs/dagre';
import { SidePanel } from './flow/side-panel';

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

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'TB' | 'LR') => {
  const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: 150,
      height: 50,
    })
  );

  dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      return {
        ...node,
        position: {
          x: position.x - 75, // Center the node
          y: position.y - 25,
        },
      };
    }),
    edges,
  };
};

// Mock metadata for nodes
const mockMetadata = {
  '1': {
    id: '1',
    label: 'Node 1',
    type: 'default',
    createdAt: '2024-03-15 10:00:00',
    lastModified: '2024-03-15 11:30:00',
    createdBy: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png'
    },
    tags: ['backend', 'api'],
    description: 'This is a default node used for general purposes.',
    status: 'active',
    priority: 'medium'
  },
  '2': {
    id: '2',
    label: 'Node 2',
    type: 'success',
    createdAt: '2024-03-15 09:00:00',
    lastModified: '2024-03-15 10:15:00',
    createdBy: {
      name: 'Jane Smith',
      avatar: 'https://github.com/shadcn.png'
    },
    tags: ['frontend', 'ui'],
    description: 'This is a success node indicating completed tasks.',
    status: 'active',
    priority: 'high'
  }
};

function Flow() {
  const { deleteElements, fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedType, setSelectedType] = useState<CustomNodeData['type']>('default');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(() => {
    // Remove double-click deletion
  }, []);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setIsPanelOpen(true);
  }, []);

  const addNewNode = useCallback(() => {
    const newNodeId = `${Date.now()}`;
    const newNode: Node<CustomNodeData, 'custom'> = {
      id: newNodeId,
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}`, type: selectedType },
    };
    
    // Add mock metadata for the new node
    mockMetadata[newNodeId] = {
      id: newNodeId,
      label: `Node ${nodes.length + 1}`,
      type: selectedType,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      createdBy: {
        name: 'System',
        avatar: 'https://github.com/shadcn.png'
      },
      tags: ['new'],
      description: `This is a new ${selectedType} node.`,
      status: 'active',
      priority: 'low'
    };
    
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes, selectedType]);

  const deleteSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter(node => node.selected);
    if (selectedNodes.length > 0) {
      deleteElements({ nodes: selectedNodes });
    }
  }, [nodes, deleteElements]);

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const layouted = getLayoutedElements(nodes, edges, direction);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
      setTimeout(() => fitView({ duration: 800 }), 100);
    },
    [nodes, edges, setNodes, setEdges, fitView]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
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
          <button 
            onClick={() => onLayout('TB')}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            Vertical Layout
          </button>
          <button 
            onClick={() => onLayout('LR')}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            Horizontal Layout
          </button>
        </Panel>
        <Background bgColor="#111827" />
        <Controls />
        <MiniMap nodeStrokeWidth={3} bgColor="#111827" nodeColor="#ffffff"/>
      </ReactFlow>
      <SidePanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        node={selectedNode ? mockMetadata[selectedNode] : null} 
      />
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