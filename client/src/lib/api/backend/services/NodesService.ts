/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkflowNodeDto } from '../models/CreateWorkflowNodeDto';
import type { UpdateWorkflowNodeDto } from '../models/UpdateWorkflowNodeDto';
import type { WorkflowNode } from '../models/WorkflowNode';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NodesService {
    /**
     * Create a new workflow node
     * @param requestBody
     * @returns WorkflowNode The node has been successfully created.
     * @throws ApiError
     */
    public static nodesControllerCreate(
        requestBody: CreateWorkflowNodeDto,
    ): CancelablePromise<WorkflowNode> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nodes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data.`,
            },
        });
    }
    /**
     * Get all workflow nodes
     * @returns WorkflowNode Return all workflow nodes.
     * @throws ApiError
     */
    public static nodesControllerFindAll(): CancelablePromise<Array<WorkflowNode>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nodes',
        });
    }
    /**
     * Get a workflow node by ID
     * @param id The ID of the workflow node
     * @returns WorkflowNode Return the workflow node.
     * @throws ApiError
     */
    public static nodesControllerFindOne(
        id: string,
    ): CancelablePromise<WorkflowNode> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nodes/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Node not found.`,
            },
        });
    }
    /**
     * Update a workflow node
     * @param id The ID of the workflow node
     * @param requestBody
     * @returns WorkflowNode The node has been successfully updated.
     * @throws ApiError
     */
    public static nodesControllerUpdate(
        id: string,
        requestBody: UpdateWorkflowNodeDto,
    ): CancelablePromise<WorkflowNode> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/nodes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Node not found.`,
            },
        });
    }
    /**
     * Delete a workflow node
     * @param id The ID of the workflow node
     * @returns WorkflowNode The node has been successfully deleted.
     * @throws ApiError
     */
    public static nodesControllerRemove(
        id: string,
    ): CancelablePromise<WorkflowNode> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/nodes/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Node not found.`,
            },
        });
    }
    /**
     * Get all nodes for a specific workflow
     * @param workflowId The ID of the workflow
     * @returns WorkflowNode Return all nodes for the workflow.
     * @throws ApiError
     */
    public static nodesControllerFindByWorkflowId(
        workflowId: string,
    ): CancelablePromise<Array<WorkflowNode>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nodes/workflow/{workflowId}',
            path: {
                'workflowId': workflowId,
            },
        });
    }
}
