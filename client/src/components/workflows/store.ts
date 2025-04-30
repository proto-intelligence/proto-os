import { create } from 'zustand';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, addEdge, Connection, Position, MarkerType } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { getLayoutedElements } from './utils/layout';
import { Task } from '@/lib/api/backend/models/Task';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodes: string[];
  layoutDirection: 'TB' | 'LR';
  addNode: (taskData: Task & { position: { x: number; y: number } }) => void;
  updateNodes: (nodes: Node[]) => void;
  updateEdges: (edges: Edge[]) => void;
  layoutNodes: (direction: 'TB' | 'LR') => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setSelectedNodes: (nodeIds: string[]) => void;
  deleteSelectedNodes: () => void;
  setLayoutDirection: (direction: 'TB' | 'LR') => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodes: [],
  layoutDirection: 'TB',
  setLayoutDirection: (direction) => set({ layoutDirection: direction }),
  addNode: (taskData) => {
    const newNode: Node = {
      id: nanoid(),
      type: 'customNode',
      position: taskData.position,
      data: taskData,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },
  updateNodes: (nodes) => set({ nodes }),
  updateEdges: (edges) => set({ edges }),
  layoutNodes: (direction) =>
    set((state) => {
      const { nodes, edges } = getLayoutedElements(state.nodes, state.edges, direction);
      
      // Update node positions based on layout direction
      const updatedNodes = nodes.map(node => ({
        ...node,
        sourcePosition: direction === 'TB' ? Position.Bottom : Position.Right,
        targetPosition: direction === 'TB' ? Position.Top : Position.Left
      }));

      return { nodes: updatedNodes, edges };
    }),
  onNodesChange: (changes) =>
    set((state) => {
      // Get all selection changes
      const selectionChanges = changes.filter((change) => change.type === 'select');
      
      // If there are any selection changes, update the selected nodes
      if (selectionChanges.length > 0) {
        const newSelectedNodes = selectionChanges.map((change) => change.id);
        return {
          nodes: applyNodeChanges(changes, state.nodes),
          selectedNodes: newSelectedNodes,
        };
      }

      // For other changes, just update the nodes and clear selection if needed
      const updatedNodes = applyNodeChanges(changes, state.nodes);
      const currentSelectedNodes = state.selectedNodes.filter(id => 
        updatedNodes.some(node => node.id === id)
      );

      return {
        nodes: updatedNodes,
        selectedNodes: currentSelectedNodes,
      };
    }),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, state.edges),
    })),
  setSelectedNodes: (nodeIds) => set({ selectedNodes: nodeIds }),
  deleteSelectedNodes: () =>
    set((state) => {
      // Remove the selected nodes
      const updatedNodes = state.nodes.filter((node) => !state.selectedNodes.includes(node.id));
      // Remove any edges connected to the deleted nodes
      const updatedEdges = state.edges.filter(
        (edge) => !state.selectedNodes.includes(edge.source) && !state.selectedNodes.includes(edge.target)
      );
      // Clear the selection
      return {
        nodes: updatedNodes,
        edges: updatedEdges,
        selectedNodes: [],
      };
    }),
})); 