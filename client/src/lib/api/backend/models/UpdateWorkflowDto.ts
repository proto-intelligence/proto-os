/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateWorkflowDto = {
    name?: string;
    description?: string;
    due_date?: string;
    created_by?: string;
    nuance_notes?: string;
    tags?: Array<string>;
    usually_takes?: string;
    task_map?: Array<string>;
    workflow_type?: UpdateWorkflowDto.workflow_type;
};
export namespace UpdateWorkflowDto {
    export enum workflow_type {
        DAG = 'dag',
        ACYCLIC = 'acyclic',
        CRON = 'cron',
    }
}

