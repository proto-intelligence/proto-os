// src/workflows/dto/create-workflow.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
import { WorkflowType } from '../entities/workflow.entity'

export class CreateWorkflowDto {
  @ApiProperty({ example: 'Cardiology Referral' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A standard cardiologist referral' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '1 week of request' })
  @IsString()
  @IsNotEmpty()
  due_date: string;

  @ApiProperty({ example: 'Dr. Smith' })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({ example: 'we usually use x person for this referral' })
  @IsString()
  @IsOptional()
  nuance_notes?: string;

  @ApiProperty({ example: ['referral', 'cardiology'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ example: '1 week' })
  @IsString()
  @IsNotEmpty()
  usually_takes: string;

  @ApiProperty({ example: ['Task A', 'Task B', 'Task C'] })
  @IsArray()
  @IsString({ each: true })
  task_map: string[];

  @ApiProperty({ enum: WorkflowType, example: WorkflowType.DAG })
  @IsEnum(WorkflowType)
  workflow_type: WorkflowType;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    description: 'An array of arbitrary JSON node objects',
    example: []
  })
  @IsArray()
  @IsOptional()
  nodes?: Record<string, any>[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    description: 'An array of arbitrary JSON edge objects',
    example: []
  })
  @IsArray()
  @IsOptional()
  edges?: Record<string, any>[];
}