import { ApiProperty } from '@nestjs/swagger';
import { OrganizationRole } from '../../organization-memberships/entities/organization-membership.entity';
import { LoginPermissionType } from '../../login-permissions/entities/login-permission.entity';

export class CredentialPermissionDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ enum: LoginPermissionType, example: LoginPermissionType.VIEW })
  permission: LoginPermissionType;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  granted_by_membership_id: string | null;
}

export class CredentialDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Electronic Health Records' })
  service_name: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'encrypted_password_string' })
  encrypted_password: string;

  @ApiProperty({ type: [CredentialPermissionDto] })
  permissions: CredentialPermissionDto[];
}

export class OrganizationWithCredentialsDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Healthcare Organization' })
  name: string;

  @ApiProperty({ enum: OrganizationRole, example: OrganizationRole.ADMIN })
  role: OrganizationRole;

  @ApiProperty({ type: [CredentialDto] })
  credentials: CredentialDto[];
}
