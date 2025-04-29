import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class AutocompleteWorkflowsDto {
  @ApiProperty({ required: true, description: 'Partial name to search for' })
  @IsString()
  q: string;

  @ApiProperty({ required: false, default: 5, minimum: 1, maximum: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  limit?: number = 5;
} 