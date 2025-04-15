import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsObject, IsUUID } from 'class-validator';
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

  @ApiProperty({ enum: TaskType, example: TaskType.ADMINISTRATIVE })
  @IsEnum(TaskType)
  type: TaskType;

  @ApiProperty({ enum: TaskUrgency, example: TaskUrgency.MEDIUM })
  @IsEnum(TaskUrgency)
  urgency: TaskUrgency;

  @ApiProperty({ example: '1 week' })
  @IsString()
  @IsNotEmpty()
  usually_takes: string;

  @ApiProperty({
    example: {
      'Step 1': 'Contact patient',
      'Step 2': 'Check availability',
      'Step 3': 'Confirm appointment'
    }
  })
  @IsObject()
  steps: Record<string, string>;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  workflow_id: string;
} 