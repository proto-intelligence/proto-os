"use client";

import React, { useCallback, useState, useEffect } from "react";
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
  NodeTypes,
  NodeProps,
} from "@xyflow/react";
import { useWorkflowStore } from "./store";
import { CustomNode } from "./CustomNode";
import { WorkflowToolbar } from "./WorkflowToolbar";
import { NodeMetadataPanel } from "./NodeMetadataPanel";
import { useWorkflowsControllerFindOne } from "@/hooks/backend/useWorkflowsControllerFindOne";
import "@xyflow/react/dist/style.css";
import { Task } from "@/lib/api/backend/models/Task";
import { ProtoToast } from "@/ui/components/ProtoToast";
import { useStateRef } from "@/hooks/useStateRef";
import { WorkflowPanel } from "./WorkflowPanel";

interface NodeData extends Task, Record<string, unknown> {
  position: { x: number; y: number };
}

const CustomNodeWrapper = (props: NodeProps) => {
  const layoutDirection = useWorkflowStore((state) => state.layoutDirection);
  return <CustomNode {...props} layoutDirection={layoutDirection} />;
};

// Define node types with a more specific type
const nodeTypes: NodeTypes = {
  customNode: CustomNodeWrapper,
};

interface WorkflowEditorProps {
  workflowId?: string;
}

function WorkflowEditorContent({ workflowId }: WorkflowEditorProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteSelectedNodes,
    updateNodes,
    updateEdges,
  } = useWorkflowStore();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(false);
  const [_, __, toastTimeoutRef] = useStateRef<NodeJS.Timeout | undefined>(undefined);

  // Fetch workflow data if workflowId is provided
  const { data: workflowData } = useWorkflowsControllerFindOne(
    workflowId || ""
  );

  // Update nodes and edges when workflow data is loaded
  useEffect(() => {
    if (workflowData && workflowId) {
      try {
        // Parse nodes from the workflow data
        const parsedNodes = workflowData.nodes.map((node) => {
          const nodeData = typeof node === "string" ? JSON.parse(node) : node;
          return {
            id: nodeData.id,
            type: "customNode",
            position: nodeData.position || { x: 0, y: 0 },
            data: nodeData.data || {},
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          };
        });

        // Parse edges from the workflow data
        const parsedEdges = workflowData.edges.map((edge) => {
          const edgeData = typeof edge === "string" ? JSON.parse(edge) : edge;
          return {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            animated: true,
            style: { stroke: "#b1b1b7" },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          };
        });

        // Update the store with the parsed data
        updateNodes(parsedNodes);
        updateEdges(parsedEdges);
      } catch (error) {
        console.error("Error parsing workflow data:", error);
      }
    }
  }, [workflowData, workflowId, updateNodes, updateEdges]);

  const handleDeleteNodes = useCallback(() => {
    deleteSelectedNodes();
  }, [deleteSelectedNodes]);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode(node as Node<NodeData>);
  }, []);

  const handleSaveSuccess = useCallback(() => {
    setShowToast(true);

    // Clear previous timeout if it exists
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // Set new timeout
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }, [toastTimeoutRef]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command + S (Mac) or Ctrl + S (Windows)
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default save dialog
        handleSaveSuccess();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSaveSuccess]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="w-full h-full"
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: "#b1b1b7" },
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
            onSaveSuccess={handleSaveSuccess}
            onWorkflowClick={() => setShowWorkflowPanel(true)}
          />
        </Panel>
        <NodeMetadataPanel
          isVisible={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          data={selectedNode?.data || null}
          nodeId={selectedNode?.id}
          workflowId={workflowId}
        />
        {showWorkflowPanel && (
          <WorkflowPanel
            workflow={workflowData || null}
            onClose={() => setShowWorkflowPanel(false)}
        />
        )}
      </ReactFlow>
      <div
        className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ease-out ${
          showToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <ProtoToast
          title="Success"
          description="Workflow saved successfully"
          variant="neutral"
        />
      </div>
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
