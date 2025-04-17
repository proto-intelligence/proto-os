import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { LoginPermissionType } from '../entities/login-permission.entity';

export class CreateLoginPermissionDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  membership_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  credential_id: string;

  @ApiProperty({ enum: LoginPermissionType, example: LoginPermissionType.VIEW })
  @IsEnum(LoginPermissionType)
  permission: LoginPermissionType;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  granted_by_membership_id?: string;
} 