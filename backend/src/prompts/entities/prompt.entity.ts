import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the prompt',
    example: 'a82b0f6e-ec32-4aaf-903f-04e86d4b3561',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Name of the prompt',
    example: 'Meditation Health Benefits',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Detailed description of the prompt',
    example:
      'This prompt explores the physical and mental health benefits of regular meditation.',
  })
  description: string;

  @Column('text')
  @ApiProperty({
    description: 'The actual prompt text',
    example: 'What are the health benefits of meditation?',
  })
  actualPrompt: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Collection or group the prompt belongs to',
    example: 'Wellness',
    required: false,
  })
  collection?: string;

  @Column('text', { array: true, nullable: true })
  @ApiProperty({
    description: 'List of tags associated with the prompt',
    example: ['health', 'meditation', 'wellness'],
    required: false,
  })
  tags?: string[];

  @Column('jsonb', { nullable: true })
  @ApiProperty({
    description: 'List of input fields (name and description)',
    example: [
      { name: 'age', description: 'Age of the individual' },
      { name: 'experience', description: 'Meditation experience level' },
    ],
    required: false,
  })
  inputs?: { name: string; description: string }[];

  @Column('jsonb', { nullable: true })
  @ApiProperty({
    description: 'List of expected outputs (name and description)',
    example: [
      { name: 'summary', description: 'Summary of benefits' },
      { name: 'citation', description: 'Scientific reference' },
    ],
    required: false,
  })
  outputs?: { name: string; description: string }[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Timestamp when the prompt was created' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'Timestamp when the prompt was last updated' })
  updatedAt: Date;
}
