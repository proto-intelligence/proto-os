import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PositionDto {
  @ApiProperty({ example: 250 })
  x: number;

  @ApiProperty({ example: 400 })
  y: number;
}

export class CreateWorkflowNodeDto {
  @ApiProperty({ example: 'workflow-uuid-5678' })
  @IsUUID()
  @IsNotEmpty()
  workflow_id: string;

  @ApiProperty({ example: 'task-uuid-9012' })
  @IsUUID()
  @IsNotEmpty()
  task_id: string;

  @ApiProperty({ example: { customParam: 42 } })
  @IsObject()
  config: Record<string, any>;

  @ApiProperty({ example: { x: 250, y: 400 } })
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;
} 