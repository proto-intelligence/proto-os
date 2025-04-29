import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEdge } from './entities/workflow-edge.entity';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';

@Injectable()
export class EdgesService {
  private readonly logger = new Logger(EdgesService.name);

  constructor(
    @InjectRepository(WorkflowEdge)
    private readonly edgesRepository: Repository<WorkflowEdge>,
  ) {}

  /**
   * Creates a new workflow edge
   * @param createEdgeDto The data for creating a new edge
   * @returns The created edge
   */
  async create(createEdgeDto: CreateEdgeDto): Promise<WorkflowEdge> {
    this.logger.log(`IN -> edgesService.create()`);
    try {
      const edge = this.edgesRepository.create(createEdgeDto);
      const result = await this.edgesRepository.save(edge);
      this.logger.log(`OUT <- edgesService.create(): Created edge with ID ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - edgesService.create(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all workflow edges
   * @returns Array of workflow edges
   */
  async findAll(): Promise<WorkflowEdge[]> {
    this.logger.log(`IN -> edgesService.findAll()`);
    try {
      const edges = await this.edgesRepository.find({
        relations: ['workflow', 'sourceNode', 'targetNode'],
      });
      this.logger.log(`OUT <- edgesService.findAll(): Found ${edges.length} edges`);
      return edges;
    } catch (error) {
      this.logger.error(`Error - edgesService.findAll(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a specific workflow edge by ID
   * @param id The ID of the edge to retrieve
   * @returns The workflow edge
   */
  async findOne(id: string): Promise<WorkflowEdge> {
    this.logger.log(`IN -> edgesService.findOne(${id})`);
    try {
      const edge = await this.edgesRepository.findOne({
        where: { id },
        relations: ['workflow', 'sourceNode', 'targetNode'],
      });
      
      if (!edge) {
        this.logger.warn(`OUT <- edgesService.findOne(): Edge with ID ${id} not found`);
        throw new NotFoundException(`Edge with ID "${id}" not found`);
      }
      
      this.logger.log(`OUT <- edgesService.findOne(): Found edge with ID ${id}`);
      return edge;
    } catch (error) {
      this.logger.error(`Error - edgesService.findOne(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all edges for a specific workflow
   * @param workflowId The ID of the workflow
   * @returns Array of workflow edges
   */
  async findByWorkflow(workflowId: string): Promise<WorkflowEdge[]> {
    this.logger.log(`IN -> edgesService.findByWorkflow(${workflowId})`);
    try {
      const edges = await this.edgesRepository.find({
        where: { workflow: { id: workflowId } },
        relations: ['workflow', 'sourceNode', 'targetNode'],
      });
      
      this.logger.log(`OUT <- edgesService.findByWorkflow(): Found ${edges.length} edges for workflow ${workflowId}`);
      return edges;
    } catch (error) {
      this.logger.error(`Error - edgesService.findByWorkflow(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Updates a workflow edge
   * @param id The ID of the edge to update
   * @param updateEdgeDto The data for updating the edge
   * @returns The updated edge
   */
  async update(id: string, updateEdgeDto: UpdateEdgeDto): Promise<WorkflowEdge> {
    this.logger.log(`IN -> edgesService.update(${id})`);
    try {
      const edge = await this.findOne(id);
      
      Object.assign(edge, updateEdgeDto);
      const result = await this.edgesRepository.save(edge);
      
      this.logger.log(`OUT <- edgesService.update(): Updated edge with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - edgesService.update(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Removes a workflow edge
   * @param id The ID of the edge to remove
   * @returns The removed edge
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> edgesService.remove(${id})`);
    try {
      const result = await this.edgesRepository.delete(id);
      
      if (result.affected === 0) {
        this.logger.warn(`OUT <- edgesService.remove(): Edge with ID ${id} not found`);
        throw new NotFoundException(`Edge with ID "${id}" not found`);
      }
      
      this.logger.log(`OUT <- edgesService.remove(): Removed edge with ID ${id}`);
    } catch (error) {
      this.logger.error(`Error - edgesService.remove(): ${error.message}`, error.stack);
      throw error;
    }
  }
} 