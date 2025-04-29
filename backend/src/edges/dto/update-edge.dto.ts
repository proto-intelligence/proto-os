import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateEdgeDto {
  @ApiProperty({ example: 'node-1' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ example: 'node-2' })
  @IsString()
  @IsOptional()
  target?: string;

  @ApiProperty({ example: { label: 'Next Step' } })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
} 