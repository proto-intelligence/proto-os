// src/workflows/workflows.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { SearchWorkflowsDto } from './dto/search-workflows.dto';
import { AutocompleteWorkflowsDto } from './dto/autocomplete-workflows.dto';

@Injectable()
export class WorkflowsService {
  private readonly logger = new Logger(WorkflowsService.name);

  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  /**
   * Create a new workflow
   */
  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    this.logger.log(`IN -> workflowsService.create()`);
    try {
      const workflow = this.workflowRepository.create(createWorkflowDto);
      const result = await this.workflowRepository.save(workflow);
      this.logger.log(`OUT <- workflowsService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all workflows
   */
  async findAll(): Promise<Workflow[]> {
    this.logger.log(`IN -> workflowsService.findAll()`);
    try {
      const workflows = await this.workflowRepository.find();
      this.logger.log(`OUT <- workflowsService.findAll()`);
      return workflows;
    } catch (error) {
      this.logger.error(`Error - workflowsService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one workflow by id
   */
  async findOne(id: string): Promise<Workflow> {
    this.logger.log(`IN -> workflowsService.findOne(${id})`);
    try {
      const workflow = await this.workflowRepository.findOne({ 
        where: { id }
      });
      if (!workflow) {
        throw new NotFoundException(`Workflow with ID ${id} not found`);
      }
      this.logger.log(`OUT <- workflowsService.findOne()`);
      return workflow;
    } catch (error) {
      this.logger.error(`Error - workflowsService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a workflow
   */
  async update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<Workflow> {
    this.logger.log(`IN -> workflowsService.update(${id})`);
    try {
      const workflow = await this.findOne(id);
      Object.assign(workflow, updateWorkflowDto);
      const result = await this.workflowRepository.save(workflow);
      this.logger.log(`OUT <- workflowsService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove a workflow
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> workflowsService.remove(${id})`);
    try {
      const workflow = await this.findOne(id);
      await this.workflowRepository.remove(workflow);
      this.logger.log(`OUT <- workflowsService.remove()`);
    } catch (error) {
      this.logger.error(`Error - workflowsService.remove(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Search workflows with pagination and filters
   * @param searchDto Search parameters
   * @returns Paginated list of workflows
   */
  async search(searchDto: SearchWorkflowsDto) {
    this.logger.log(`IN -> workflowsService.search()`);
    try {
      const {
        search,
        tags,
        workflowType,
        createdBy,
        organizationId,
        createdFrom,
        createdTo,
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        sortOrder = 'DESC',
      } = searchDto;

      const queryBuilder = this.workflowRepository.createQueryBuilder('workflow');

      // Apply search filter
      if (search) {
        queryBuilder.andWhere(
          '(workflow.name LIKE :search OR workflow.description LIKE :search)',
          { search: `%${search}%` },
        );
      }

      // Apply tags filter
      if (tags && tags.length > 0) {
        queryBuilder.andWhere('workflow.tags && :tags', { tags });
      }

      // Apply workflow type filter
      if (workflowType) {
        queryBuilder.andWhere('workflow.workflow_type = :workflowType', { workflowType });
      }

      // Apply created by filter
      if (createdBy) {
        queryBuilder.andWhere('workflow.created_by = :createdBy', { createdBy });
      }

      // Apply organization filter
      if (organizationId) {
        queryBuilder.andWhere('workflow.organization_id = :organizationId', { organizationId });
      }

      // Apply date range filter
      if (createdFrom && createdTo) {
        queryBuilder.andWhere('workflow.created_at BETWEEN :createdFrom AND :createdTo', {
          createdFrom,
          createdTo,
        });
      }

      // Apply sorting
      queryBuilder.orderBy(`workflow.${sortBy}`, sortOrder);

      // Apply pagination
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);

      const [workflows, total] = await queryBuilder.getManyAndCount();

      this.logger.log(`OUT <- workflowsService.search()`);
      return {
        data: workflows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error - workflowsService.search(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Get distinct values for filters
   * @returns Object containing distinct values for tags, workflow types, and creators
   */
  async getFilters() {
    this.logger.log(`IN -> workflowsService.getFilters()`);
    try {
      const [tags, workflowTypes, creators] = await Promise.all([
        this.workflowRepository
          .createQueryBuilder('workflow')
          .select('DISTINCT unnest(workflow.tags)', 'tag')
          .getRawMany(),
        this.workflowRepository
          .createQueryBuilder('workflow')
          .select('DISTINCT workflow.workflow_type', 'type')
          .getRawMany(),
        this.workflowRepository
          .createQueryBuilder('workflow')
          .select('DISTINCT workflow.created_by', 'creator')
          .getRawMany(),
      ]);

      const result = {
        tags: tags.map(t => t.tag),
        workflowTypes: workflowTypes.map(t => t.type),
        creators: creators.map(c => c.creator),
      };

      this.logger.log(`OUT <- workflowsService.getFilters(): Retrieved filter values`);
      return result;
    } catch (error) {
      this.logger.error(`Error - workflowsService.getFilters(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get workflow suggestions for autocomplete
   * @param autocompleteDto Autocomplete parameters
   * @returns List of workflow suggestions
   */
  async autocomplete(autocompleteDto: AutocompleteWorkflowsDto) {
    this.logger.log(`IN -> workflowsService.autocomplete()`);
    try {
      const { q, limit = 5 } = autocompleteDto;

      const workflows = await this.workflowRepository
        .createQueryBuilder('workflow')
        .select(['workflow.id', 'workflow.name'])
        .where('workflow.name ILIKE :query', { query: `%${q}%` })
        .orderBy('workflow.name', 'ASC')
        .take(limit)
        .getMany();

      this.logger.log(`OUT <- workflowsService.autocomplete(): Found ${workflows.length} suggestions`);
      return workflows;
    } catch (error) {
      this.logger.error(`Error - workflowsService.autocomplete(): ${error.message}`, error.stack);
      throw error;
    }
  }
}