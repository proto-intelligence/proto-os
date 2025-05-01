// src/workflows/entities/workflow.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsArray, IsDate, IsOptional } from 'class-validator';

export enum WorkflowType {
  DAG = 'dag',
  ACYCLIC = 'acyclic',
  CRON = 'cron'
}

@Entity('workflows')
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Patient Admission Process' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Workflow for handling patient admission' })
  @IsString()
  @IsOptional()
  description: string;

  @Column()
  @ApiProperty({ example: '1 week of request' })
  @IsString()
  due_date: string;

  @Column()
  @ApiProperty({ example: 'clerk_user_id' })
  @IsString()
  created_by: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'clerk_org_id' })
  @IsString()
  @IsOptional()
  organization_id: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'we usually use x person for this referral' })
  @IsString()
  @IsOptional()
  nuance_notes: string;

  @Column('simple-array')
  @ApiProperty({ example: ['referral', 'cardiology'] })
  @IsArray()
  tags: string[];

  @Column()
  @ApiProperty({ example: '1 week' })
  @IsString()
  usually_takes: string;

  @Column({
    type: 'enum',
    enum: WorkflowType,
    default: WorkflowType.DAG
  })
  @ApiProperty({ enum: WorkflowType, example: WorkflowType.DAG })
  @IsEnum(WorkflowType)
  workflow_type: WorkflowType;

  @Column('jsonb', { nullable: true })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    description: 'An array of arbitrary JSON node objects',
  })
  @IsArray()
  nodes: Record<string, any>[];

  @Column('jsonb', { nullable: true })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    description: 'An array of arbitrary JSON node objects',
  })
  @IsArray()
  edges: Record<string, any>[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
}