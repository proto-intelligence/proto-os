import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { Workflow } from '../../workflows/entities/workflow.entity';
import { WorkflowNode } from '../../nodes/entities/workflow-node.entity';

@Entity('workflow_edges')
export class WorkflowEdge {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: 'node-1' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @Column()
  @ApiProperty({ example: 'node-2' })
  @IsString()
  @IsNotEmpty()
  target: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ example: { label: 'Next Step' } })
  @IsObject()
  @IsOptional()
  data: Record<string, any>;

  @ManyToOne(() => Workflow, workflow => workflow.edges)
  @JoinColumn()
  @ApiProperty({ type: () => Workflow })
  workflow: Workflow;

  @ManyToOne(() => WorkflowNode, node => node.sourceEdges)
  @JoinColumn({ name: 'source_id' })
  @ApiProperty({ type: () => WorkflowNode })
  sourceNode: WorkflowNode;

  @ManyToOne(() => WorkflowNode, node => node.targetEdges)
  @JoinColumn({ name: 'target_id' })
  @ApiProperty({ type: () => WorkflowNode })
  targetNode: WorkflowNode;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 