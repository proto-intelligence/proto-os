/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { OrganizationWithCredentialsDto } from '../models/OrganizationWithCredentialsDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create user
     * @param requestBody
     * @returns User User successfully created.
     * @throws ApiError
     */
    public static usersControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all users
     * @returns User List of all users.
     * @throws ApiError
     */
    public static usersControllerFindAll(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }
    /**
     * Get user by id
     * @param id User ID
     * @returns User User found.
     * @throws ApiError
     */
    public static usersControllerFindOne(
        id: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Update user
     * @param id User ID
     * @param requestBody
     * @returns User User successfully updated.
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Delete user
     * @param id User ID
     * @returns any User successfully deleted.
     * @throws ApiError
     */
    public static usersControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Get user by Clerk ID
     * @param clerkId Clerk User ID
     * @returns User User found.
     * @throws ApiError
     */
    public static usersControllerFindByClerkId(
        clerkId: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/clerk/{clerkId}',
            path: {
                'clerkId': clerkId,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Get organizations with credentials for a user
     * @param userId User ID
     * @returns OrganizationWithCredentialsDto Organizations with credentials found.
     * @throws ApiError
     */
    public static usersControllerGetOrganizationsWithCredentials(
        userId: string,
    ): CancelablePromise<Array<OrganizationWithCredentialsDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}/organizations-with-credentials',
            path: {
                'userId': userId,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
}
