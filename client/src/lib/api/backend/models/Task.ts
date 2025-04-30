/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Task = {
    id: string;
    name: string;
    description: string;
    type: Task.type;
    urgency: Task.urgency;
    usually_takes: string;
    steps: Record<string, any>;
    created_at: string;
    updated_at: string;
};
export namespace Task {
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

