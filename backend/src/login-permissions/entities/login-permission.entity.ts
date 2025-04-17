import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { OrganizationMembership } from '../../organization-memberships/entities/organization-membership.entity';
import { LoginCredential } from '../../login-credentials/entities/login-credential.entity';

export enum LoginPermissionType {
  VIEW = 'view',
  MANAGE = 'manage'
}

@Entity('login_permissions')
export class LoginPermission {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  membership_id: string;

  @Column()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  credential_id: string;

  @Column({
    type: 'enum',
    enum: LoginPermissionType,
    default: LoginPermissionType.VIEW
  })
  @ApiProperty({ enum: LoginPermissionType, example: LoginPermissionType.VIEW })
  @IsEnum(LoginPermissionType)
  permission: LoginPermissionType;

  @Column({ nullable: true })
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  granted_by_membership_id: string;

  @ManyToOne(() => OrganizationMembership, membership => membership.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'membership_id' })
  membership: OrganizationMembership;

  @ManyToOne(() => LoginCredential, credential => credential.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id' })
  credential: LoginCredential;

  @ManyToOne(() => OrganizationMembership, membership => membership.granted_permissions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'granted_by_membership_id' })
  granted_by_membership: OrganizationMembership;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 