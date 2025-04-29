import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EdgesService } from './edges.service';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';
import { WorkflowEdge } from './entities/workflow-edge.entity';

@ApiTags('edges')
@Controller('edges')
export class EdgesController {
  constructor(private readonly edgesService: EdgesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new edge' })
  @ApiResponse({ status: 201, description: 'The edge has been successfully created.', type: WorkflowEdge })
  create(@Body() createEdgeDto: CreateEdgeDto) {
    return this.edgesService.create(createEdgeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all edges' })
  @ApiResponse({ status: 200, description: 'Return all edges.', type: [WorkflowEdge] })
  findAll() {
    return this.edgesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an edge by id' })
  @ApiResponse({ status: 200, description: 'Return the edge.', type: WorkflowEdge })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.edgesService.findOne(id);
  }

  @Get('workflow/:workflowId')
  @ApiOperation({ summary: 'Get all edges for a workflow' })
  @ApiResponse({ status: 200, description: 'Return all edges for the workflow.', type: [WorkflowEdge] })
  findByWorkflow(@Param('workflowId', ParseUUIDPipe) workflowId: string) {
    return this.edgesService.findByWorkflow(workflowId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an edge' })
  @ApiResponse({ status: 200, description: 'The edge has been successfully updated.', type: WorkflowEdge })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEdgeDto: UpdateEdgeDto,
  ) {
    return this.edgesService.update(id, updateEdgeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an edge' })
  @ApiResponse({ status: 200, description: 'The edge has been successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.edgesService.remove(id);
  }
} 