/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Workflow } from './Workflow';
import type { WorkflowNode } from './WorkflowNode';
export type WorkflowEdge = {
    id: string;
    source: string;
    target: string;
    data: Record<string, any>;
    workflow: Workflow;
    sourceNode: WorkflowNode;
    targetNode: WorkflowNode;
    created_at: string;
    updated_at: string;
};

