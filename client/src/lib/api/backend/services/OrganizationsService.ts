/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrganizationDto } from '../models/CreateOrganizationDto';
import type { Organization } from '../models/Organization';
import type { UpdateOrganizationDto } from '../models/UpdateOrganizationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * Create organization
     * @param requestBody
     * @returns Organization Organization successfully created.
     * @throws ApiError
     */
    public static organizationsControllerCreate(
        requestBody: CreateOrganizationDto,
    ): CancelablePromise<Organization> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organizations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all organizations
     * @returns Organization List of all organizations.
     * @throws ApiError
     */
    public static organizationsControllerFindAll(): CancelablePromise<Array<Organization>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations',
        });
    }
    /**
     * Get organization by id
     * @param id Organization ID
     * @returns Organization Organization found.
     * @throws ApiError
     */
    public static organizationsControllerFindOne(
        id: string,
    ): CancelablePromise<Organization> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Organization not found.`,
            },
        });
    }
    /**
     * Update organization
     * @param id Organization ID
     * @param requestBody
     * @returns Organization Organization successfully updated.
     * @throws ApiError
     */
    public static organizationsControllerUpdate(
        id: string,
        requestBody: UpdateOrganizationDto,
    ): CancelablePromise<Organization> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/organizations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Organization not found.`,
            },
        });
    }
    /**
     * Delete organization
     * @param id Organization ID
     * @returns any Organization successfully deleted.
     * @throws ApiError
     */
    public static organizationsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Organization not found.`,
            },
        });
    }
    /**
     * Get organization by name
     * @param name Organization name
     * @returns Organization Organization found.
     * @throws ApiError
     */
    public static organizationsControllerFindByName(
        name: string,
    ): CancelablePromise<Organization> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/name/{name}',
            path: {
                'name': name,
            },
            errors: {
                404: `Organization not found.`,
            },
        });
    }
}
