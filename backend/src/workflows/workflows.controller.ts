// src/workflows/workflows.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { SearchWorkflowsDto } from './dto/search-workflows.dto';
import { AutocompleteWorkflowsDto } from './dto/autocomplete-workflows.dto';
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

  @Get('search')
  @ApiOperation({ summary: 'Search workflows with pagination and filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return paginated list of workflows' })
  async search(@Query() rawQuery: any) {
    this.logger.log(`IN -> workflowsController.search()`);
    this.logger.log('Raw query parameters:', {
      page: rawQuery.page,
      limit: rawQuery.limit,
      pageType: typeof rawQuery.page,
      limitType: typeof rawQuery.limit
    });

    // Create DTO with explicit type conversion
    const searchDto: SearchWorkflowsDto = {
      ...rawQuery,
      page: rawQuery.page ? Number(rawQuery.page) : 1,
      limit: rawQuery.limit ? Number(rawQuery.limit) : 10
    };

    this.logger.log('Processed search DTO:', {
      page: searchDto.page,
      limit: searchDto.limit,
      pageType: typeof searchDto.page,
      limitType: typeof searchDto.limit
    });

    try {
      const result = await this.workflowsService.search(searchDto);
      this.logger.log(`OUT <- workflowsController.search(): Found ${result.data.length} workflows`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.search(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get distinct values for filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return distinct values for tags, workflow types, and creators' })
  async getFilters() {
    this.logger.log(`IN -> workflowsController.getFilters()`);
    try {
      const result = await this.workflowsService.getFilters();
      this.logger.log(`OUT <- workflowsController.getFilters(): Retrieved filter values`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.getFilters(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get workflow suggestions for autocomplete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return list of workflow suggestions' })
  async autocomplete(@Query() autocompleteDto: AutocompleteWorkflowsDto) {
    this.logger.log(`IN -> workflowsController.autocomplete()`);
    try {
      const result = await this.workflowsService.autocomplete(autocompleteDto);
      this.logger.log(`OUT <- workflowsController.autocomplete(): Found ${result.length} suggestions`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsController.autocomplete(): ${error.message}`, error.stack);
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