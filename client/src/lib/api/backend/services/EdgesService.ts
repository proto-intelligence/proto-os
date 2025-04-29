/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEdgeDto } from '../models/CreateEdgeDto';
import type { UpdateEdgeDto } from '../models/UpdateEdgeDto';
import type { WorkflowEdge } from '../models/WorkflowEdge';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EdgesService {
    /**
     * Create a new edge
     * @param requestBody
     * @returns WorkflowEdge The edge has been successfully created.
     * @throws ApiError
     */
    public static edgesControllerCreate(
        requestBody: CreateEdgeDto,
    ): CancelablePromise<WorkflowEdge> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/edges',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all edges
     * @returns WorkflowEdge Return all edges.
     * @throws ApiError
     */
    public static edgesControllerFindAll(): CancelablePromise<Array<WorkflowEdge>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/edges',
        });
    }
    /**
     * Get an edge by id
     * @param id
     * @returns WorkflowEdge Return the edge.
     * @throws ApiError
     */
    public static edgesControllerFindOne(
        id: string,
    ): CancelablePromise<WorkflowEdge> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/edges/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update an edge
     * @param id
     * @param requestBody
     * @returns WorkflowEdge The edge has been successfully updated.
     * @throws ApiError
     */
    public static edgesControllerUpdate(
        id: string,
        requestBody: UpdateEdgeDto,
    ): CancelablePromise<WorkflowEdge> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/edges/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete an edge
     * @param id
     * @returns any The edge has been successfully deleted.
     * @throws ApiError
     */
    public static edgesControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/edges/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all edges for a workflow
     * @param workflowId
     * @returns WorkflowEdge Return all edges for the workflow.
     * @throws ApiError
     */
    public static edgesControllerFindByWorkflow(
        workflowId: string,
    ): CancelablePromise<Array<WorkflowEdge>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/edges/workflow/{workflowId}',
            path: {
                'workflowId': workflowId,
            },
        });
    }
}
