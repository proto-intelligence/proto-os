import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { AutocompleteTasksDto } from './dto/autocomplete-tasks.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Task })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.log(`IN -> tasksController.create()`);
    try {
      const result = await this.tasksService.create(createTaskDto);
      this.logger.log(`OUT <- tasksController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  async findAll(): Promise<Task[]> {
    this.logger.log(`IN -> tasksController.findAll()`);
    try {
      const result = await this.tasksService.findAll();
      this.logger.log(`OUT <- tasksController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Search tasks with pagination and filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return paginated list of tasks' })
  async search(@Query() searchDto: SearchTasksDto) {
    this.logger.log(`IN -> tasksController.search()`);
    try {
      const result = await this.tasksService.search(searchDto);
      this.logger.log(`OUT <- tasksController.search(): Found ${result.items.length} tasks`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.search(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get distinct values for filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return distinct values for task types, urgencies, and workflows' })
  async getFilters() {
    this.logger.log(`IN -> tasksController.getFilters()`);
    try {
      const result = await this.tasksService.getFilters();
      this.logger.log(`OUT <- tasksController.getFilters(): Retrieved filter values`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.getFilters(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get task suggestions for autocomplete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return list of task suggestions' })
  async autocomplete(@Query() autocompleteDto: AutocompleteTasksDto) {
    this.logger.log(`IN -> tasksController.autocomplete()`);
    try {
      const result = await this.tasksService.autocomplete(autocompleteDto);
      this.logger.log(`OUT <- tasksController.autocomplete(): Found ${result.length} suggestions`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.autocomplete(): ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  async findOne(@Param('id') id: string): Promise<Task> {
    this.logger.log(`IN -> tasksController.findOne(${id})`);
    try {
      const result = await this.tasksService.findOne(id);
      this.logger.log(`OUT <- tasksController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    this.logger.log(`IN -> tasksController.update(${id})`);
    try {
      const result = await this.tasksService.update(id, updateTaskDto);
      this.logger.log(`OUT <- tasksController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> tasksController.remove(${id})`);
    try {
      await this.tasksService.remove(id);
      this.logger.log(`OUT <- tasksController.remove()`);
    } catch (error) {
      this.logger.error(`Error - tasksController.remove(): ${error.message}`);
      throw error;
    }
  }
} 