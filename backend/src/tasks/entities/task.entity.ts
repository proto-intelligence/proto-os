import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export type TaskType = string;
export type TaskUrgency = string;

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

  @Column()
  @ApiProperty({ example: 'administrative' })
  @IsString()
  @IsNotEmpty()
  type: TaskType;

  @Column()
  @ApiProperty({ example: 'medium' })
  @IsString()
  @IsNotEmpty()
  urgency: TaskUrgency;

  @Column()
  @ApiProperty({ example: '1 week' })
  @IsString()
  usually_takes: string;

  @Column('jsonb')
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    example: [
      { step: 'Contact patient', notes: 'Call during business hours' },
      { step: 'Check availability', notes: 'Use scheduling system' },
      { step: 'Confirm appointment', notes: 'Send confirmation email' }
    ]
  })
  @IsArray()
  steps: Record<string, any>[];

  @Column()
  @ApiProperty({ example: 'clerk_user_id' })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'clerk_org_id' })
  @IsString()
  @IsOptional()
  organization_id?: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 