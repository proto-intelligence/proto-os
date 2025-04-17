/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateLoginPermissionDto = {
    membership_id?: string;
    credential_id?: string;
    permission?: UpdateLoginPermissionDto.permission;
    granted_by_membership_id?: string;
};
export namespace UpdateLoginPermissionDto {
    export enum permission {
        VIEW = 'view',
        MANAGE = 'manage',
    }
}

