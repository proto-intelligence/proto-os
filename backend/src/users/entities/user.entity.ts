import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { OrganizationMembership } from '../../organization-memberships/entities/organization-membership.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'user_2NKQsK2Z5YZ5YZ5YZ5YZ5YZ5YZ' })
  @IsString()
  @IsNotEmpty()
  clerk_user_id: string;

  @Column()
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @OneToMany(() => OrganizationMembership, membership => membership.user)
  memberships: OrganizationMembership[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 