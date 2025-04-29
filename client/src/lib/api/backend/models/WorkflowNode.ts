/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkflowEdge } from './WorkflowEdge';
export type WorkflowNode = {
    id: string;
    label: string;
    type: string;
    data: Record<string, any>;
    position_x: number;
    position_y: number;
    workflow_id: string;
    task_id: string;
    config: Record<string, any>;
    position: Record<string, any>;
    sourceEdges: Array<WorkflowEdge>;
    targetEdges: Array<WorkflowEdge>;
    created_at: string;
    updated_at: string;
};

