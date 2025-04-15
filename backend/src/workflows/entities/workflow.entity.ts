// src/workflows/entities/workflow.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsArray, IsDate, IsOptional } from 'class-validator';
import { Task } from '../../tasks/entities/task.entity';

export enum WorkflowType {
  DAG = 'dag',
  ACYCLIC = 'acyclic'
}

@Entity('workflows')
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Cardiology Referral' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty({ example: 'A standard cardiologist referral' })
  @IsString()
  description: string;

  @Column()
  @ApiProperty({ example: '1 week of request' })
  @IsString()
  due_date: string;

  @Column()
  @ApiProperty({ example: 'Dr. Smith' })
  @IsString()
  created_by: string;

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

  @Column('simple-array')
  @ApiProperty({ example: ['Task A', 'Task B', 'Task C'] })
  @IsArray()
  task_map: string[];

  @Column({
    type: 'enum',
    enum: WorkflowType,
    default: WorkflowType.DAG
  })
  @ApiProperty({ enum: WorkflowType, example: WorkflowType.DAG })
  @IsEnum(WorkflowType)
  workflow_type: WorkflowType;

  @OneToMany(() => Task, task => task.workflow)
  @ApiProperty({ type: () => [Task] })
  tasks: Task[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
}