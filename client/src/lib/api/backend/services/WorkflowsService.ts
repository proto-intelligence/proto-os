/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkflowDto } from '../models/CreateWorkflowDto';
import type { UpdateWorkflowDto } from '../models/UpdateWorkflowDto';
import type { Workflow } from '../models/Workflow';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkflowsService {
    /**
     * Create a new workflow
     * @param requestBody
     * @returns Workflow
     * @throws ApiError
     */
    public static workflowsControllerCreate(
        requestBody: CreateWorkflowDto,
    ): CancelablePromise<Workflow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/workflows',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all workflows
     * @returns Workflow
     * @throws ApiError
     */
    public static workflowsControllerFindAll(): CancelablePromise<Array<Workflow>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows',
        });
    }
    /**
     * Search workflows with pagination and filters
     * @param search Search term for name and description
     * @param tags Filter by tags
     * @param workflowType Filter by workflow type
     * @param createdBy Filter by creator
     * @param organizationId Filter by organization
     * @param createdFrom Filter by creation date range start
     * @param createdTo Filter by creation date range end
     * @param page
     * @param limit
     * @param sortBy Field to sort by
     * @param sortOrder
     * @returns any Return paginated list of workflows
     * @throws ApiError
     */
    public static workflowsControllerSearch(
        search?: string,
        tags?: Array<string>,
        workflowType?: 'dag' | 'acyclic' | 'cron',
        createdBy?: string,
        organizationId?: string,
        createdFrom?: string,
        createdTo?: string,
        page?: string | number,
        limit?: string | number,
        sortBy: string = 'created_at',
        sortOrder: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows/search',
            query: {
                'search': search,
                'tags': tags,
                'workflowType': workflowType,
                'createdBy': createdBy,
                'organizationId': organizationId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'page': page?.toString(),
                'limit': limit?.toString(),
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Get distinct values for filters
     * @returns any Return distinct values for tags, workflow types, and creators
     * @throws ApiError
     */
    public static workflowsControllerGetFilters(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows/filters',
        });
    }
    /**
     * Get workflow suggestions for autocomplete
     * @param q Partial name to search for
     * @param limit
     * @returns any Return list of workflow suggestions
     * @throws ApiError
     */
    public static workflowsControllerAutocomplete(
        q: string,
        limit: number = 5,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows/autocomplete',
            query: {
                'q': q,
                'limit': limit,
            },
        });
    }
    /**
     * Get a workflow by id
     * @param id
     * @returns Workflow
     * @throws ApiError
     */
    public static workflowsControllerFindOne(
        id: string,
    ): CancelablePromise<Workflow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a workflow
     * @param id
     * @param requestBody
     * @returns Workflow
     * @throws ApiError
     */
    public static workflowsControllerUpdate(
        id: string,
        requestBody: UpdateWorkflowDto,
    ): CancelablePromise<Workflow> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/workflows/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a workflow
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static workflowsControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/workflows/{id}',
            path: {
                'id': id,
            },
        });
    }
}
