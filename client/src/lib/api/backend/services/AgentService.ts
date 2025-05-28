/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentService {
    /**
     * Stream text response
     * Streams a text response from the AI model using a predefined prompt.
     * @returns any Successfully streaming text response
     * @throws ApiError
     */
    public static agentControllerStream(): CancelablePromise<{
        data?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/agent/stream',
            errors: {
                500: `Internal server error occurred while streaming`,
            },
        });
    }
    /**
     * Stream data with custom initialization
     * Streams data with a custom initialization message and error handling.
     * @returns any Successfully streaming data with initialization
     * @throws ApiError
     */
    public static agentControllerStreamData(): CancelablePromise<{
        data?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/agent/stream-data',
            errors: {
                500: `Internal server error occurred while streaming`,
            },
        });
    }
}
