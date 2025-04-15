import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { Workflow } from '../../workflows/entities/workflow.entity';

export enum TaskType {
  ADMINISTRATIVE = 'administrative',
  CLINICAL = 'clinical',
  TECHNICAL = 'technical'
}

export enum TaskUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Schedule Initial Consultation' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty({ example: 'Schedule the first consultation with the cardiologist' })
  @IsString()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.ADMINISTRATIVE
  })
  @ApiProperty({ enum: TaskType, example: TaskType.ADMINISTRATIVE })
  @IsEnum(TaskType)
  type: TaskType;

  @Column({
    type: 'enum',
    enum: TaskUrgency,
    default: TaskUrgency.MEDIUM
  })
  @ApiProperty({ enum: TaskUrgency, example: TaskUrgency.MEDIUM })
  @IsEnum(TaskUrgency)
  urgency: TaskUrgency;

  @Column()
  @ApiProperty({ example: '1 week' })
  @IsString()
  usually_takes: string;

  @Column('jsonb')
  @ApiProperty({
    example: {
      'Step 1': 'Contact patient',
      'Step 2': 'Check availability',
      'Step 3': 'Confirm appointment'
    }
  })
  @IsObject()
  steps: Record<string, string>;

  @Column()
  @ApiProperty()
  workflow_id: string;

  @ManyToOne(() => Workflow, workflow => workflow.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 