/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrganizationMembership = {
    id: string;
    user_id: string;
    organization_id: string;
    role: OrganizationMembership.role;
    created_at: string;
    updated_at: string;
};
export namespace OrganizationMembership {
    export enum role {
        ADMIN = 'admin',
        MEMBER = 'member',
        PATIENT = 'patient',
        VENDOR = 'vendor',
        PROTO_ADMIN = 'proto-admin',
        PROTO_OPERATOR = 'proto-operator',
    }
}

