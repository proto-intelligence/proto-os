/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LoginPermission = {
    id: string;
    membership_id: string;
    credential_id: string;
    permission: LoginPermission.permission;
    granted_by_membership_id?: string;
    created_at: string;
    updated_at: string;
};
export namespace LoginPermission {
    export enum permission {
        VIEW = 'view',
        MANAGE = 'manage',
    }
}

