import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { TaskType, TaskUrgency } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 'Schedule Initial Consultation' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Schedule the first consultation with the cardiologist' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'administrative' })
  @IsString()
  @IsNotEmpty()
  type: TaskType;

  @ApiProperty({ example: 'medium' })
  @IsString()
  @IsNotEmpty()
  urgency: TaskUrgency;

  @ApiProperty({ example: '1 week' })
  @IsString()
  @IsNotEmpty()
  usually_takes: string;

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

  @ApiProperty({ example: 'clerk_user_id' })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({ example: 'clerk_org_id' })
  @IsString()
  @IsOptional()
  organization_id?: string;
} 