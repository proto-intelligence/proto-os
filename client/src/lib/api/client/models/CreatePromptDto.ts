/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromptFieldDto } from './PromptFieldDto';
export type CreatePromptDto = {
    /**
     * Name of the prompt
     */
    name: string;
    /**
     * Brief description of the prompt purpose
     */
    description: string;
    /**
     * The actual text of the prompt
     */
    actualPrompt: string;
    /**
     * Prompt collection or group
     */
    collection: string;
    /**
     * Tags used to categorize the prompt
     */
    tags: Array<string>;
    /**
     * List of expected input fields
     */
    inputs: Array<PromptFieldDto>;
    /**
     * List of output fields the prompt will return
     */
    outputs: Array<PromptFieldDto>;
};

