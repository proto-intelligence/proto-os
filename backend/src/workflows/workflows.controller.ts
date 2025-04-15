// src/workflows/workflows.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow } from './entities/workflow.entity';

@ApiTags('workflows')
@Controller('workflows')
export class WorkflowsController {
  private readonly logger = new Logger(WorkflowsController.name);

  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workflow' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Workflow })
  async create(@Body() createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    this.logger.log(`IN -> workflowsController.create()`);
    try {
      const result = await this.workflowsService.create(createWorkflowDto);
      this.logger.log(`OUT <- workflowsController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all workflows' })
  @ApiResponse({ status: HttpStatus.OK, type: [Workflow] })
  async findAll(): Promise<Workflow[]> {
    this.logger.log(`IN -> workflowsController.findAll()`);
    try {
      const result = await this.workflowsService.findAll();
      this.logger.log(`OUT <- workflowsController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workflow by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: Workflow })
  async findOne(@Param('id') id: string): Promise<Workflow> {
    this.logger.log(`IN -> workflowsController.findOne(${id})`);
    try {
      const result = await this.workflowsService.findOne(id);
      this.logger.log(`OUT <- workflowsController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workflow' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: Workflow })
  async update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    this.logger.log(`IN -> workflowsController.update(${id})`);
    try {
      const result = await this.workflowsService.update(id, updateWorkflowDto);
      this.logger.log(`OUT <- workflowsController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> workflowsController.remove(${id})`);
    try {
      await this.workflowsService.remove(id);
      this.logger.log(`OUT <- workflowsController.remove()`);
    } catch (error) {
      this.logger.error(`Error - workflowsController.remove(): ${error.message}`);
      throw error;
    }
  }
}