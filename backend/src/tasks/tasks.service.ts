import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { AutocompleteTasksDto } from './dto/autocomplete-tasks.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
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
      const tasks = await this.taskRepository.find();
      this.logger.log(`OUT <- tasksService.findAll()`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error - tasksService.findAll(): ${error.message}`);
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
        where: { id }
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

  /**
   * Search tasks with pagination and filters
   * @param searchDto Search parameters
   * @returns Paginated list of tasks
   */
  async search(searchDto: SearchTasksDto) {
    this.logger.log(`IN -> tasksService.search()`);
    try {
      const {
        search,
        type,
        urgency,
        workflowId,
        createdBy,
        organizationId,
        createdFrom,
        createdTo,
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        sortOrder = 'DESC',
      } = searchDto;

      const queryBuilder = this.taskRepository.createQueryBuilder('task');

      // Apply search filter
      if (search) {
        queryBuilder.andWhere(
          '(task.name LIKE :search OR task.description LIKE :search)',
          { search: `%${search}%` },
        );
      }

      // Apply type filter
      if (type) {
        queryBuilder.andWhere('task.type = :type', { type });
      }

      // Apply urgency filter
      if (urgency) {
        queryBuilder.andWhere('task.urgency = :urgency', { urgency });
      }

      // Apply workflow filter
      if (workflowId) {
        queryBuilder.andWhere('task.workflow_id = :workflowId', { workflowId });
      }

      // Apply created by filter
      if (createdBy) {
        queryBuilder.andWhere('task.created_by = :createdBy', { createdBy });
      }

      // Apply organization filter
      if (organizationId) {
        queryBuilder.andWhere('task.organization_id = :organizationId', { organizationId });
      }

      // Apply date range filter
      if (createdFrom && createdTo) {
        queryBuilder.andWhere('task.created_at BETWEEN :createdFrom AND :createdTo', {
          createdFrom,
          createdTo,
        });
      }

      // Apply sorting
      queryBuilder.orderBy(`task.${sortBy}`, sortOrder);

      // Apply pagination
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);

      const [tasks, total] = await queryBuilder.getManyAndCount();

      this.logger.log(`OUT <- tasksService.search()`);
      return {
        data: tasks,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error - tasksService.search(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Get distinct values for filters
   * @returns Object containing distinct values for task types and urgencies
   */
  async getFilters() {
    this.logger.log(`IN -> tasksService.getFilters()`);
    try {
      const [types, urgencies] = await Promise.all([
        this.taskRepository
          .createQueryBuilder('task')
          .select('DISTINCT task.type', 'type')
          .getRawMany(),
        this.taskRepository
          .createQueryBuilder('task')
          .select('DISTINCT task.urgency', 'urgency')
          .getRawMany(),
      ]);

      const result = {
        types: types.map(t => t.type),
        urgencies: urgencies.map(u => u.urgency),
      };

      this.logger.log(`OUT <- tasksService.getFilters(): Retrieved filter values`);
      return result;
    } catch (error) {
      this.logger.error(`Error - tasksService.getFilters(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get task suggestions for autocomplete
   * @param autocompleteDto Autocomplete parameters
   * @returns List of task suggestions
   */
  async autocomplete(autocompleteDto: AutocompleteTasksDto) {
    this.logger.log(`IN -> tasksService.autocomplete()`);
    try {
      const { q, limit = 5 } = autocompleteDto;

      const tasks = await this.taskRepository
        .createQueryBuilder('task')
        .select(['task.id', 'task.name'])
        .where('task.name ILIKE :query', { query: `%${q}%` })
        .orderBy('task.name', 'ASC')
        .take(limit)
        .getMany();

      this.logger.log(`OUT <- tasksService.autocomplete(): Found ${tasks.length} suggestions`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error - tasksService.autocomplete(): ${error.message}`, error.stack);
      throw error;
    }
  }
} 