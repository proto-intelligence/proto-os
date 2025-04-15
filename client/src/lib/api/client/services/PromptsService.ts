/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePromptDto } from '../models/CreatePromptDto';
import type { Prompt } from '../models/Prompt';
import type { UpdatePromptDto } from '../models/UpdatePromptDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PromptsService {
    /**
     * Create a new prompt
     * @param requestBody
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerCreate(
        requestBody: CreatePromptDto,
    ): CancelablePromise<Prompt> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/prompts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all prompts
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerFindAll(): CancelablePromise<Array<Prompt>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts',
        });
    }
    /**
     * Get a specific prompt by ID
     * @param id UUID of the prompt
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerFindOne(
        id: string,
    ): CancelablePromise<Prompt> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a prompt by ID
     * @param id UUID of the prompt to update
     * @param requestBody
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerUpdate(
        id: string,
        requestBody: UpdatePromptDto,
    ): CancelablePromise<Prompt> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/prompts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a prompt by ID
     * @param id UUID of the prompt to delete
     * @returns any Successfully deleted
     * @throws ApiError
     */
    public static promptsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/prompts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Search prompts by one or more tags
     * @param tags
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerSearchByTags(
        tags: Array<string>,
    ): CancelablePromise<Array<Prompt>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/search/by-tags',
            query: {
                'tags': tags,
            },
        });
    }
    /**
     * Search prompts by collection name
     * @param collection
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerSearchByCollection(
        collection: string,
    ): CancelablePromise<Array<Prompt>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/search/by-collection',
            query: {
                'collection': collection,
            },
        });
    }
    /**
     * Search prompts by prompt content
     * @param q Text to search in actualPrompt
     * @returns Prompt
     * @throws ApiError
     */
    public static promptsControllerSearchByPromptText(
        q: string,
    ): CancelablePromise<Array<Prompt>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/search/by-text',
            query: {
                'q': q,
            },
        });
    }
    /**
     * Get all unique tags
     * @returns string List of all unique tags
     * @throws ApiError
     */
    public static promptsControllerGetAllTags(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/tags/unique',
        });
    }
    /**
     * Get all unique collections
     * @returns string List of all unique collections
     * @throws ApiError
     */
    public static promptsControllerGetAllCollections(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/collections/unique',
        });
    }
}
