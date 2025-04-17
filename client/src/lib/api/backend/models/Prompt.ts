/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Prompt = {
    /**
     * Unique identifier for the prompt
     */
    id: string;
    /**
     * Name of the prompt
     */
    name: string;
    /**
     * Detailed description of the prompt
     */
    description: string;
    /**
     * The actual prompt text
     */
    actualPrompt: string;
    /**
     * Collection or group the prompt belongs to
     */
    collection?: string;
    /**
     * List of tags associated with the prompt
     */
    tags?: Array<string>;
    /**
     * List of input fields (name and description)
     */
    inputs?: Array<string>;
    /**
     * List of expected outputs (name and description)
     */
    outputs?: Array<string>;
    /**
     * Timestamp when the prompt was created
     */
    createdAt: string;
    /**
     * Timestamp when the prompt was last updated
     */
    updatedAt: string;
};

