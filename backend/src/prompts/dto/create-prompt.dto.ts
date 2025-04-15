import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PromptFieldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user_age',
    description: 'Name of the input/output field',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Age of the user',
    description: 'Description of the field',
  })
  description: string;
}

export class CreatePromptDto {
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Meditation Benefits Prompt',
    description: 'Name of the prompt',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Generates a list of health benefits based on user input',
    description: 'Brief description of the prompt purpose',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'List the top health benefits of regular meditation...',
    description: 'The actual text of the prompt',
  })
  actualPrompt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'wellness',
    description: 'Prompt collection or group',
  })
  collection: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['meditation', 'health', 'mindfulness'],
    description: 'Tags used to categorize the prompt',
    type: [String],
  })
  tags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromptFieldDto)
  @ApiProperty({
    description: 'List of expected input fields',
    type: [PromptFieldDto],
    example: [
      { name: 'user_age', description: 'Age of the user' },
      {
        name: 'experience_level',
        description: 'Meditation experience in years',
      },
    ],
  })
  inputs: PromptFieldDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromptFieldDto)
  @ApiProperty({
    description: 'List of output fields the prompt will return',
    type: [PromptFieldDto],
    example: [{ name: 'benefits', description: 'Array of health benefits' }],
  })
  outputs: PromptFieldDto[];
}
