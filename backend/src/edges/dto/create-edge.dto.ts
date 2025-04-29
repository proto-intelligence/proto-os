import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsObject, IsUUID } from 'class-validator';

export class CreateEdgeDto {
  @ApiProperty({ example: 'node-1' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ example: 'node-2' })
  @IsString()
  @IsNotEmpty()
  target: string;

  @ApiProperty({ example: { label: 'Next Step' } })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  workflowId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  sourceNodeId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  targetNodeId: string;
} 