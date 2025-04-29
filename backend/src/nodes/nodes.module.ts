import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { WorkflowNode } from './entities/workflow-node.entity';
import { WorkflowsModule } from '../workflows/workflows.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowNode]),
    WorkflowsModule,
    TasksModule
  ],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService]
})
export class NodesModule {} 