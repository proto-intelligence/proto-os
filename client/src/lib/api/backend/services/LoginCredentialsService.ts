/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLoginCredentialDto } from '../models/CreateLoginCredentialDto';
import type { LoginCredential } from '../models/LoginCredential';
import type { UpdateLoginCredentialDto } from '../models/UpdateLoginCredentialDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginCredentialsService {
    /**
     * Create login credential
     * @param requestBody
     * @returns LoginCredential Login credential successfully created.
     * @throws ApiError
     */
    public static loginCredentialsControllerCreate(
        requestBody: CreateLoginCredentialDto,
    ): CancelablePromise<LoginCredential> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login-credentials',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all login credentials
     * @returns LoginCredential List of all login credentials.
     * @throws ApiError
     */
    public static loginCredentialsControllerFindAll(): CancelablePromise<Array<LoginCredential>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login-credentials',
        });
    }
    /**
     * Get login credential by id
     * @param id Login credential ID
     * @returns LoginCredential Login credential found.
     * @throws ApiError
     */
    public static loginCredentialsControllerFindOne(
        id: string,
    ): CancelablePromise<LoginCredential> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login-credentials/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Login credential not found.`,
            },
        });
    }
    /**
     * Update login credential
     * @param id Login credential ID
     * @param requestBody
     * @returns LoginCredential Login credential successfully updated.
     * @throws ApiError
     */
    public static loginCredentialsControllerUpdate(
        id: string,
        requestBody: UpdateLoginCredentialDto,
    ): CancelablePromise<LoginCredential> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/login-credentials/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Login credential not found.`,
            },
        });
    }
    /**
     * Delete login credential
     * @param id Login credential ID
     * @returns any Login credential successfully deleted.
     * @throws ApiError
     */
    public static loginCredentialsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/login-credentials/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Login credential not found.`,
            },
        });
    }
}
