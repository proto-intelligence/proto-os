/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CredentialPermissionDto = {
    id: string;
    permission: CredentialPermissionDto.permission;
    granted_by_membership_id?: string;
};
export namespace CredentialPermissionDto {
    export enum permission {
        VIEW = 'view',
        MANAGE = 'manage',
    }
}

