import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsEnum, IsDateString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkflowType } from '../entities/workflow.entity';

export class SearchWorkflowsDto {
  @ApiProperty({ required: false, description: 'Search term for name and description' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, type: [String], description: 'Filter by tags' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ required: false, enum: WorkflowType, description: 'Filter by workflow type' })
  @IsEnum(WorkflowType)
  @IsOptional()
  workflowType?: WorkflowType;

  @ApiProperty({ required: false, description: 'Filter by creator' })
  @IsString()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({ required: false, description: 'Filter by organization' })
  @IsString()
  @IsOptional()
  organizationId?: string;

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