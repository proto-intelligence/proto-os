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
     * Get all tasks for a workflow
     * @param workflowId
     * @returns Task
     * @throws ApiError
     */
    public static tasksControllerFindByWorkflowId(
        workflowId: string,
    ): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/workflow/{workflowId}',
            path: {
                'workflowId': workflowId,
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
