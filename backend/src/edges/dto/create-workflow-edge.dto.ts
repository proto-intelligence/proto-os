import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkflowEdgeDto {
  @ApiProperty({ example: 'workflow-uuid-5678' })
  @IsUUID()
  @IsNotEmpty()
  workflow_id: string;

  @ApiProperty({ example: 'node-uuid-1234' })
  @IsUUID()
  @IsNotEmpty()
  source_node_id: string;

  @ApiProperty({ example: 'output-1', required: false })
  @IsString()
  @IsOptional()
  source_handle?: string;

  @ApiProperty({ example: 'node-uuid-7890' })
  @IsUUID()
  @IsNotEmpty()
  target_node_id: string;

  @ApiProperty({ example: 'input-1', required: false })
  @IsString()
  @IsOptional()
  target_handle?: string;
} 