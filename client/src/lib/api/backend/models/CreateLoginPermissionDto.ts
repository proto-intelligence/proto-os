/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateLoginPermissionDto = {
    membership_id: string;
    credential_id: string;
    permission: CreateLoginPermissionDto.permission;
    granted_by_membership_id?: string;
};
export namespace CreateLoginPermissionDto {
    export enum permission {
        VIEW = 'view',
        MANAGE = 'manage',
    }
}

