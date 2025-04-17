/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrganizationMembershipDto = {
    user_id: string;
    organization_id: string;
    role: CreateOrganizationMembershipDto.role;
};
export namespace CreateOrganizationMembershipDto {
    export enum role {
        ADMIN = 'admin',
        MEMBER = 'member',
        PATIENT = 'patient',
        VENDOR = 'vendor',
        PROTO_ADMIN = 'proto-admin',
        PROTO_OPERATOR = 'proto-operator',
    }
}

