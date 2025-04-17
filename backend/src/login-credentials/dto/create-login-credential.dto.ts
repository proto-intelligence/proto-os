import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLoginCredentialDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  organization_id: string;

  @ApiProperty({ example: 'Electronic Health Records' })
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'encrypted_password_string' })
  @IsString()
  @IsNotEmpty()
  encrypted_password: string;
} 