/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskDto = {
    name?: string;
    description?: string;
    type?: UpdateTaskDto.type;
    urgency?: UpdateTaskDto.urgency;
    usually_takes?: string;
    steps?: Record<string, any>;
    workflow_id?: string;
};
export namespace UpdateTaskDto {
    export enum type {
        ADMINISTRATIVE = 'administrative',
        CLINICAL = 'clinical',
        TECHNICAL = 'technical',
    }
    export enum urgency {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
        CRITICAL = 'critical',
    }
}

