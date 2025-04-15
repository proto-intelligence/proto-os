import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  /**
   * Create a new task
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.log(`IN -> tasksService.create()`);
    try {
      const task = this.taskRepository.create(createTaskDto);
      const result = await this.taskRepository.save(task);
      this.logger.log(`OUT <- tasksService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all tasks
   */
  async findAll(): Promise<Task[]> {
    this.logger.log(`IN -> tasksService.findAll()`);
    try {
      const tasks = await this.taskRepository.find({
        relations: ['workflow']
      });
      this.logger.log(`OUT <- tasksService.findAll()`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error - tasksService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find tasks by workflow ID
   */
  async findByWorkflowId(workflowId: string): Promise<Task[]> {
    this.logger.log(`IN -> tasksService.findByWorkflowId(${workflowId})`);
    try {
      const tasks = await this.taskRepository.find({
        where: { workflow_id: workflowId },
        relations: ['workflow']
      });
      this.logger.log(`OUT <- tasksService.findByWorkflowId()`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error - tasksService.findByWorkflowId(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one task by id
   */
  async findOne(id: string): Promise<Task> {
    this.logger.log(`IN -> tasksService.findOne(${id})`);
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ['workflow']
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.logger.log(`OUT <- tasksService.findOne()`);
      return task;
    } catch (error) {
      this.logger.error(`Error - tasksService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a task
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.logger.log(`IN -> tasksService.update(${id})`);
    try {
      const task = await this.findOne(id);
      Object.assign(task, updateTaskDto);
      const result = await this.taskRepository.save(task);
      this.logger.log(`OUT <- tasksService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove a task
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> tasksService.remove(${id})`);
    try {
      const task = await this.findOne(id);
      await this.taskRepository.remove(task);
      this.logger.log(`OUT <- tasksService.remove()`);
    } catch (error) {
      this.logger.error(`Error - tasksService.remove(): ${error.message}`);
      throw error;
    }
  }
} 