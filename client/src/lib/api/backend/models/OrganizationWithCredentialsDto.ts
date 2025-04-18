/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CredentialDto } from './CredentialDto';
export type OrganizationWithCredentialsDto = {
    id: string;
    name: string;
    role: OrganizationWithCredentialsDto.role;
    credentials: Array<CredentialDto>;
};
export namespace OrganizationWithCredentialsDto {
    export enum role {
        ADMIN = 'admin',
        MEMBER = 'member',
        PATIENT = 'patient',
        VENDOR = 'vendor',
        PROTO_ADMIN = 'proto-admin',
        PROTO_OPERATOR = 'proto-operator',
    }
}

