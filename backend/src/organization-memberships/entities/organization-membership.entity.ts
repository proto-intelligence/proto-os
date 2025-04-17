import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { LoginPermission } from '../../login-permissions/entities/login-permission.entity';

export enum OrganizationRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  PATIENT = 'patient',
  VENDOR = 'vendor',
  PROTO_ADMIN = 'proto-admin',
  PROTO_OPERATOR = 'proto-operator'
}

@Entity('organization_memberships')
export class OrganizationMembership {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  user_id: string;

  @Column()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  organization_id: string;

  @Column({
    type: 'enum',
    enum: OrganizationRole,
    default: OrganizationRole.MEMBER
  })
  @ApiProperty({ enum: OrganizationRole, example: OrganizationRole.MEMBER })
  @IsEnum(OrganizationRole)
  role: OrganizationRole;

  @ManyToOne(() => User, user => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Organization, organization => organization.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => LoginPermission, permission => permission.membership)
  permissions: LoginPermission[];

  @OneToMany(() => LoginPermission, permission => permission.granted_by_membership)
  granted_permissions: LoginPermission[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 