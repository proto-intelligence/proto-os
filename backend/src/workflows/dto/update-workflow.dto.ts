// src/workflows/dto/update-workflow.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateWorkflowDto } from './create-workflow.dto';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {}