import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Workflow } from '../../workflows/entities/workflow.entity';
import { Task } from '../../tasks/entities/task.entity';
import { WorkflowEdge } from '../../edges/entities/workflow-edge.entity';
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsObject } from 'class-validator';

export enum NodeType {
  START = 'start',
  END = 'end',
  TASK = 'task',
  CONDITION = 'condition',
  PARALLEL = 'parallel',
  SUBPROCESS = 'subprocess'
}

@Entity('workflow_nodes')
export class WorkflowNode {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Initial Assessment' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @Column()
  @ApiProperty({ example: 'task' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ example: { taskType: 'CLINICAL', priority: 'HIGH' } })
  @IsObject()
  @IsOptional()
  data: Record<string, any>;

  @Column({ type: 'float' })
  @ApiProperty({ example: 100 })
  position_x: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: 200 })
  position_y: number;

  @ManyToOne(() => Workflow, workflow => workflow.nodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column('uuid')
  @ApiProperty({ example: 'workflow-uuid-5678' })
  workflow_id: string;

  @ManyToOne(() => Task, { eager: true })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column('uuid')
  @ApiProperty({ example: 'task-uuid-9012' })
  task_id: string;

  @Column('jsonb', { default: '{}' })
  @ApiProperty({ example: { customParam: 42 } })
  config: Record<string, any>;

  @Column('jsonb')
  @ApiProperty({ example: { x: 250, y: 400 } })
  position: { x: number; y: number };

  @OneToMany(() => WorkflowEdge, edge => edge.sourceNode)
  @ApiProperty({ type: () => [WorkflowEdge] })
  sourceEdges: WorkflowEdge[];

  @OneToMany(() => WorkflowEdge, edge => edge.targetNode)
  @ApiProperty({ type: () => [WorkflowEdge] })
  targetEdges: WorkflowEdge[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
} 