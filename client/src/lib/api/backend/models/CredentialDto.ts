/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CredentialPermissionDto } from './CredentialPermissionDto';
export type CredentialDto = {
    id: string;
    service_name: string;
    username: string;
    encrypted_password: string;
    permissions: Array<CredentialPermissionDto>;
};

