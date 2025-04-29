import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskType, TaskUrgency } from '../entities/task.entity';

export class SearchTasksDto {
  @ApiProperty({ required: false, description: 'Search term for name and description' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, enum: TaskType, description: 'Filter by task type' })
  @IsEnum(TaskType)
  @IsOptional()
  type?: TaskType;

  @ApiProperty({ required: false, enum: TaskUrgency, description: 'Filter by task urgency' })
  @IsEnum(TaskUrgency)
  @IsOptional()
  urgency?: TaskUrgency;

  @ApiProperty({ required: false, description: 'Filter by workflow ID' })
  @IsString()
  @IsOptional()
  workflowId?: string;

  @ApiProperty({ required: false, description: 'Filter by creation date range start' })
  @IsDateString()
  @IsOptional()
  createdFrom?: string;

  @ApiProperty({ required: false, description: 'Filter by creation date range end' })
  @IsDateString()
  @IsOptional()
  createdTo?: string;

  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ required: false, default: 'created_at', description: 'Field to sort by' })
  @IsString()
  @IsOptional()
  sortBy?: string = 'created_at';

  @ApiProperty({ required: false, default: 'DESC', enum: ['ASC', 'DESC'] })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
} 