/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrganizationMembershipDto } from '../models/CreateOrganizationMembershipDto';
import type { OrganizationMembership } from '../models/OrganizationMembership';
import type { UpdateOrganizationMembershipDto } from '../models/UpdateOrganizationMembershipDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationMembershipsService {
    /**
     * Create organization membership
     * @param requestBody
     * @returns OrganizationMembership Organization membership successfully created.
     * @throws ApiError
     */
    public static organizationMembershipsControllerCreate(
        requestBody: CreateOrganizationMembershipDto,
    ): CancelablePromise<OrganizationMembership> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organization-memberships',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all organization memberships
     * @returns OrganizationMembership List of all organization memberships.
     * @throws ApiError
     */
    public static organizationMembershipsControllerFindAll(): CancelablePromise<Array<OrganizationMembership>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organization-memberships',
        });
    }
    /**
     * Get organization membership by id
     * @param id Organization membership ID
     * @returns OrganizationMembership Organization membership found.
     * @throws ApiError
     */
    public static organizationMembershipsControllerFindOne(
        id: string,
    ): CancelablePromise<OrganizationMembership> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organization-memberships/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Organization membership not found.`,
            },
        });
    }
    /**
     * Update organization membership
     * @param id Organization membership ID
     * @param requestBody
     * @returns OrganizationMembership Organization membership successfully updated.
     * @throws ApiError
     */
    public static organizationMembershipsControllerUpdate(
        id: string,
        requestBody: UpdateOrganizationMembershipDto,
    ): CancelablePromise<OrganizationMembership> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/organization-memberships/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Organization membership not found.`,
            },
        });
    }
    /**
     * Delete organization membership
     * @param id Organization membership ID
     * @returns any Organization membership successfully deleted.
     * @throws ApiError
     */
    public static organizationMembershipsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organization-memberships/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Organization membership not found.`,
            },
        });
    }
}
