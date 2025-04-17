/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateOrganizationMembershipDto = {
    user_id?: string;
    organization_id?: string;
    role?: UpdateOrganizationMembershipDto.role;
};
export namespace UpdateOrganizationMembershipDto {
    export enum role {
        ADMIN = 'admin',
        MEMBER = 'member',
        PATIENT = 'patient',
        VENDOR = 'vendor',
        PROTO_ADMIN = 'proto-admin',
        PROTO_OPERATOR = 'proto-operator',
    }
}

