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
import { useWorkflowsControllerUpdate } from "@/hooks/backend/useWorkflowsControllerUpdate";
import "@xyflow/react/dist/style.css";
import { Task } from "@/lib/api/backend/models/Task";
import { ProtoToast } from "@/ui/components/ProtoToast";
import { useStateRef } from "@/hooks/useStateRef";
import { WorkflowPanel } from "./WorkflowPanel";
import { WorkflowHotKeyPanel } from "./HotKeyPanel";

interface NodeData extends Task, Record<string, unknown> {
  position: { x: number; y: number };
}

const CustomNodeWrapper = (props: NodeProps) => {
  const layoutDirection = useWorkflowStore((state) => state.layoutDirection);
  const selectedNode = useWorkflowStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === props.id;
  return <CustomNode {...props} layoutDirection={layoutDirection} isSelected={isSelected} />;
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
    selectedNode,
    setSelectedNode,
  } = useWorkflowStore();
  const [showToast, setShowToast] = useState(false);
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(false);
  const [_, __, toastTimeoutRef] = useStateRef<NodeJS.Timeout | undefined>(undefined);

  // Get the update mutation hook
  const { mutate: updateWorkflow } = useWorkflowsControllerUpdate();

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
  }, [setSelectedNode]);

  const handleSaveSuccess = useCallback(() => {
    if (!workflowId) {
      console.error("No workflow ID provided");
      return;
    }

    try {
      // Get the current state from the workflow store
      const { nodes, edges } = useWorkflowStore.getState();

      // Format nodes data properly
      const formattedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
      }));

      // Format edges data properly
      const formattedEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: edge.style,
        markerEnd: edge.markerEnd,
      }));

      // Update the workflow in the backend
      updateWorkflow(
        {
          id: workflowId,
          data: {
            nodes: formattedNodes,
            edges: formattedEdges
          }
        },
        {
          onSuccess: () => {
            setShowToast(true);
            // Clear previous timeout if it exists
            if (toastTimeoutRef.current) {
              clearTimeout(toastTimeoutRef.current);
            }
            // Set new timeout
            toastTimeoutRef.current = setTimeout(() => {
              setShowToast(false);
            }, 2000);
          },
          onError: (error) => {
            console.error("Failed to save workflow:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  }, [workflowId, updateWorkflow, toastTimeoutRef]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command + S (Mac) or Ctrl + S (Windows)
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default save dialog
        handleSaveSuccess();
      }
      // Check for Command + D (Mac) or Ctrl + D (Windows)
      if ((event.metaKey || event.ctrlKey) && event.key === "r") {
        event.preventDefault();
        handleDeleteNodes();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSaveSuccess, handleDeleteNodes]);

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
   
        <WorkflowHotKeyPanel />
     
        <NodeMetadataPanel
          isVisible={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          data={selectedNode?.data as unknown as Task | null}
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
          title="Successfully Saved Your Workflow"
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
