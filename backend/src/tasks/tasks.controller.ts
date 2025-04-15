import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  @Get('workflow/:workflowId')
  @ApiOperation({ summary: 'Get all tasks for a workflow' })
  @ApiParam({ name: 'workflowId', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  async findByWorkflowId(@Param('workflowId') workflowId: string): Promise<Task[]> {
    this.logger.log(`IN -> tasksController.findByWorkflowId(${workflowId})`);
    try {
      const result = await this.tasksService.findByWorkflowId(workflowId);
      this.logger.log(`OUT <- tasksController.findByWorkflowId()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksController.findByWorkflowId(): ${error.message}`);
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