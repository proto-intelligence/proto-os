/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLoginPermissionDto } from '../models/CreateLoginPermissionDto';
import type { LoginPermission } from '../models/LoginPermission';
import type { UpdateLoginPermissionDto } from '../models/UpdateLoginPermissionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginPermissionsService {
    /**
     * Create login permission
     * @param requestBody
     * @returns LoginPermission Login permission successfully created.
     * @throws ApiError
     */
    public static loginPermissionsControllerCreate(
        requestBody: CreateLoginPermissionDto,
    ): CancelablePromise<LoginPermission> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login-permissions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all login permissions
     * @returns LoginPermission List of all login permissions.
     * @throws ApiError
     */
    public static loginPermissionsControllerFindAll(): CancelablePromise<Array<LoginPermission>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login-permissions',
        });
    }
    /**
     * Get login permission by id
     * @param id Login permission ID
     * @returns LoginPermission Login permission found.
     * @throws ApiError
     */
    public static loginPermissionsControllerFindOne(
        id: string,
    ): CancelablePromise<LoginPermission> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login-permissions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Login permission not found.`,
            },
        });
    }
    /**
     * Update login permission
     * @param id Login permission ID
     * @param requestBody
     * @returns LoginPermission Login permission successfully updated.
     * @throws ApiError
     */
    public static loginPermissionsControllerUpdate(
        id: string,
        requestBody: UpdateLoginPermissionDto,
    ): CancelablePromise<LoginPermission> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/login-permissions/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Login permission not found.`,
            },
        });
    }
    /**
     * Delete login permission
     * @param id Login permission ID
     * @returns any Login permission successfully deleted.
     * @throws ApiError
     */
    public static loginPermissionsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/login-permissions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Login permission not found.`,
            },
        });
    }
}
