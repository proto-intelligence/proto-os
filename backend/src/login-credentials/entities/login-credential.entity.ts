import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Organization } from '../../organizations/entities/organization.entity';
import { LoginPermission } from '../../login-permissions/entities/login-permission.entity';

@Entity('login_credentials')
export class LoginCredential {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  organization_id: string;

  @Column()
  @ApiProperty({ example: 'Electronic Health Records' })
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @Column()
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @ApiProperty({ example: 'encrypted_password_string' })
  @IsString()
  @IsNotEmpty()
  encrypted_password: string;

  @ManyToOne(() => Organization, organization => organization.credentials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => LoginPermission, permission => permission.credential)
  permissions: LoginPermission[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 