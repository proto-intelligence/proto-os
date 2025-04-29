import { PartialType } from '@nestjs/swagger';
import { CreateWorkflowEdgeDto } from './create-workflow-edge.dto';

export class UpdateWorkflowEdgeDto extends PartialType(CreateWorkflowEdgeDto) {} 