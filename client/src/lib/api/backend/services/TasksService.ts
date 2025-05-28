/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { Task } from '../models/Task';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Create a new task
     * @param requestBody
     * @returns Task
     * @throws ApiError
     */
    public static tasksControllerCreate(
        requestBody: CreateTaskDto,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all tasks
     * @returns Task
     * @throws ApiError
     */
    public static tasksControllerFindAll(): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks',
        });
    }
    /**
     * Search tasks with pagination and filters
     * @param search Search term for name and description
     * @param type Filter by task type
     * @param urgency Filter by task urgency
     * @param workflowId Filter by workflow ID
     * @param createdBy Filter by creator
     * @param organizationId Filter by organization
     * @param createdFrom Filter by creation date range start
     * @param createdTo Filter by creation date range end
     * @param page
     * @param limit
     * @param sortBy Field to sort by
     * @param sortOrder
     * @returns any Return paginated list of tasks
     * @throws ApiError
     */
    public static tasksControllerSearch(
        search?: string,
        type?: string,
        urgency?: string,
        workflowId?: string,
        createdBy?: string,
        organizationId?: string,
        createdFrom?: string,
        createdTo?: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'created_at',
        sortOrder: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/search',
            query: {
                'search': search,
                'type': type,
                'urgency': urgency,
                'workflowId': workflowId,
                'createdBy': createdBy,
                'organizationId': organizationId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Get distinct values for filters
     * @returns any Return distinct values for task types, urgencies, and workflows
     * @throws ApiError
     */
    public static tasksControllerGetFilters(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/filters',
        });
    }
    /**
     * Get task suggestions for autocomplete
     * @param q Partial name to search for
     * @param limit
     * @returns any Return list of task suggestions
     * @throws ApiError
     */
    public static tasksControllerAutocomplete(
        q: string,
        limit: number = 5,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/autocomplete',
            query: {
                'q': q,
                'limit': limit,
            },
        });
    }
    /**
     * Get a task by id
     * @param id
     * @returns Task
     * @throws ApiError
     */
    public static tasksControllerFindOne(
        id: string,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a task
     * @param id
     * @param requestBody
     * @returns Task
     * @throws ApiError
     */
    public static tasksControllerUpdate(
        id: string,
        requestBody: UpdateTaskDto,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a task
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static tasksControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
        });
    }
}
