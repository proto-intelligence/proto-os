import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowNode } from './entities/workflow-node.entity';
import { CreateWorkflowNodeDto } from './dto/create-workflow-node.dto';
import { UpdateWorkflowNodeDto } from './dto/update-workflow-node.dto';

@Injectable()
export class NodesService {
  private readonly logger = new Logger(NodesService.name);

  constructor(
    @InjectRepository(WorkflowNode)
    private readonly nodeRepository: Repository<WorkflowNode>,
  ) {}

  /**
   * Creates a new workflow node
   * @param createNodeDto The data for creating a new node
   * @returns The created node
   */
  async create(createNodeDto: CreateWorkflowNodeDto): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesService.create()`);
    try {
      const node = this.nodeRepository.create(createNodeDto);
      const result = await this.nodeRepository.save(node);
      this.logger.log(`OUT <- nodesService.create(): Created node with ID ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesService.create(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all workflow nodes
   * @returns Array of workflow nodes
   */
  async findAll(): Promise<WorkflowNode[]> {
    this.logger.log(`IN -> nodesService.findAll()`);
    try {
      const nodes = await this.nodeRepository.find({
        relations: ['workflow', 'task'],
      });
      this.logger.log(`OUT <- nodesService.findAll(): Found ${nodes.length} nodes`);
      return nodes;
    } catch (error) {
      this.logger.error(`Error - nodesService.findAll(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a specific workflow node by ID
   * @param id The ID of the node to retrieve
   * @returns The workflow node
   */
  async findOne(id: string): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesService.findOne(${id})`);
    try {
      const node = await this.nodeRepository.findOne({
        where: { id },
        relations: ['workflow', 'task'],
      });
      
      if (!node) {
        this.logger.warn(`OUT <- nodesService.findOne(): Node with ID ${id} not found`);
        throw new NotFoundException(`Node with ID ${id} not found`);
      }
      
      this.logger.log(`OUT <- nodesService.findOne(): Found node with ID ${id}`);
      return node;
    } catch (error) {
      this.logger.error(`Error - nodesService.findOne(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all nodes for a specific workflow
   * @param workflowId The ID of the workflow
   * @returns Array of workflow nodes
   */
  async findByWorkflowId(workflowId: string): Promise<WorkflowNode[]> {
    this.logger.log(`IN -> nodesService.findByWorkflowId(${workflowId})`);
    try {
      const nodes = await this.nodeRepository.find({
        where: { workflow_id: workflowId },
        relations: ['task'],
        order: {
          position_x: 'ASC',
          position_y: 'ASC'
        }
      });
      
      this.logger.log(`OUT <- nodesService.findByWorkflowId(): Found ${nodes.length} nodes for workflow ${workflowId}`);
      return nodes;
    } catch (error) {
      this.logger.error(`Error - nodesService.findByWorkflowId(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Updates a workflow node
   * @param id The ID of the node to update
   * @param updateNodeDto The data for updating the node
   * @returns The updated node
   */
  async update(id: string, updateNodeDto: UpdateWorkflowNodeDto): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesService.update(${id})`);
    try {
      const node = await this.findOne(id);
      
      const updatedNode = this.nodeRepository.merge(node, updateNodeDto);
      const result = await this.nodeRepository.save(updatedNode);
      
      this.logger.log(`OUT <- nodesService.update(): Updated node with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesService.update(): ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Removes a workflow node
   * @param id The ID of the node to remove
   * @returns The removed node
   */
  async remove(id: string): Promise<WorkflowNode> {
    this.logger.log(`IN -> nodesService.remove(${id})`);
    try {
      const node = await this.findOne(id);
      const result = await this.nodeRepository.remove(node);
      
      this.logger.log(`OUT <- nodesService.remove(): Removed node with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error - nodesService.remove(): ${error.message}`, error.stack);
      throw error;
    }
  }
} 