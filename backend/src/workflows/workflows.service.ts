// src/workflows/workflows.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowsService {
  private readonly logger = new Logger(WorkflowsService.name);

  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
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
      const workflow = await this.workflowRepository.findOne({ where: { id } });
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
}