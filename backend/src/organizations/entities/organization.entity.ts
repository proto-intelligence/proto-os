import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { OrganizationMembership } from '../../organization-memberships/entities/organization-membership.entity';
import { LoginCredential } from '../../login-credentials/entities/login-credential.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'Acme Healthcare' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => OrganizationMembership, membership => membership.organization)
  memberships: OrganizationMembership[];

  @OneToMany(() => LoginCredential, credential => credential.organization)
  credentials: LoginCredential[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 