import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgesService } from './edges.service';
import { EdgesController } from './edges.controller';
import { WorkflowEdge } from './entities/workflow-edge.entity';
import { WorkflowsModule } from '../workflows/workflows.module';
import { NodesModule } from '../nodes/nodes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowEdge]),
    WorkflowsModule,
    NodesModule
  ],
  controllers: [EdgesController],
  providers: [EdgesService],
  exports: [EdgesService]
})
export class EdgesModule {} 