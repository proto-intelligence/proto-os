/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClerkService {
    /**
     * Handle Clerk webhook events
     * @param svixId
     * @param svixTimestamp
     * @param svixSignature
     * @returns any Webhook processed successfully
     * @throws ApiError
     */
    public static clerkControllerHandleWebhook(
        svixId: string,
        svixTimestamp: string,
        svixSignature: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/clerk/webhooks',
            headers: {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
            },
        });
    }
}
