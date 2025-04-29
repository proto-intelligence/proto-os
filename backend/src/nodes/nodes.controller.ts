import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NodesService } from './nodes.service';
import { CreateWorkflowNodeDto } from './dto/create-workflow-node.dto';
import { UpdateWorkflowNodeDto } from './dto/update-workflow-node.dto';
import { WorkflowNode } from './entities/workflow-node.entity';

@ApiTags('nodes')
@Controller('nodes')
export class NodesController {
  private readonly logger = new Logger(NodesController.name);

  constructor(private readonly nodesService: NodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workflow node' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The node has been successfully created.', type: WorkflowNode })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  async create(@Body() createNodeDto: CreateWorkflowNodeDto): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesController.create()`);
    try {
      const result = await this.nodesService.create(createNodeDto);
      this.logger.log(`OUT <- nodesController.create(): Created node with ID ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.create(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all workflow nodes' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all workflow nodes.', type: [WorkflowNode] })
  async findAll(): Promise<WorkflowNode[]> {
    this.logger.log(`IN -> nodesController.findAll()`);
    try {
      const result = await this.nodesService.findAll();
      this.logger.log(`OUT <- nodesController.findAll(): Found ${result.length} nodes`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.findAll(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workflow node by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the workflow node' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the workflow node.', type: WorkflowNode })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Node not found.' })
  async findOne(@Param('id') id: string): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesController.findOne(${id})`);
    try {
      const result = await this.nodesService.findOne(id);
      this.logger.log(`OUT <- nodesController.findOne(): Found node with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.findOne(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('workflow/:workflowId')
  @ApiOperation({ summary: 'Get all nodes for a specific workflow' })
  @ApiParam({ name: 'workflowId', description: 'The ID of the workflow' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all nodes for the workflow.', type: [WorkflowNode] })
  async findByWorkflowId(@Param('workflowId') workflowId: string): Promise<WorkflowNode[]> {
    this.logger.log(`IN -> nodesController.findByWorkflowId(${workflowId})`);
    try {
      const result = await this.nodesService.findByWorkflowId(workflowId);
      this.logger.log(`OUT <- nodesController.findByWorkflowId(): Found ${result.length} nodes for workflow ${workflowId}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.findByWorkflowId(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workflow node' })
  @ApiParam({ name: 'id', description: 'The ID of the workflow node' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The node has been successfully updated.', type: WorkflowNode })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Node not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateNodeDto: UpdateWorkflowNodeDto,
  ): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesController.update(${id})`);
    try {
      const result = await this.nodesService.update(id, updateNodeDto);
      this.logger.log(`OUT <- nodesController.update(): Updated node with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.update(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow node' })
  @ApiParam({ name: 'id', description: 'The ID of the workflow node' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The node has been successfully deleted.', type: WorkflowNode })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Node not found.' })
  async remove(@Param('id') id: string): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesController.remove(${id})`);
    try {
      const result = await this.nodesService.remove(id);
      this.logger.log(`OUT <- nodesController.remove(): Removed node with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesController.remove(): ${error.message}`, error.stack);
      throw error;
    }
  }
} 