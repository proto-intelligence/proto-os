import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  /**
   * Create a new organization
   */
  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    this.logger.log(`IN -> organizationsService.create()`);
    try {
      const organization = this.organizationRepository.create(createOrganizationDto);
      const result = await this.organizationRepository.save(organization);
      this.logger.log(`OUT <- organizationsService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all organizations
   */
  async findAll(): Promise<Organization[]> {
    this.logger.log(`IN -> organizationsService.findAll()`);
    try {
      const organizations = await this.organizationRepository.find({
        relations: ['memberships', 'credentials']
      });
      this.logger.log(`OUT <- organizationsService.findAll()`);
      return organizations;
    } catch (error) {
      this.logger.error(`Error - organizationsService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one organization by id
   */
  async findOne(id: string): Promise<Organization> {
    this.logger.log(`IN -> organizationsService.findOne(${id})`);
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id },
        relations: ['memberships', 'credentials']
      });
      if (!organization) {
        throw new NotFoundException(`Organization with ID ${id} not found`);
      }
      this.logger.log(`OUT <- organizationsService.findOne()`);
      return organization;
    } catch (error) {
      this.logger.error(`Error - organizationsService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find organization by name
   */
  async findByName(name: string): Promise<Organization> {
    this.logger.log(`IN -> organizationsService.findByName(${name})`);
    try {
      const organization = await this.organizationRepository.findOne({
        where: { name },
        relations: ['memberships', 'credentials']
      });
      if (!organization) {
        throw new NotFoundException(`Organization with name ${name} not found`);
      }
      this.logger.log(`OUT <- organizationsService.findByName()`);
      return organization;
    } catch (error) {
      this.logger.error(`Error - organizationsService.findByName(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update an organization
   */
  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    this.logger.log(`IN -> organizationsService.update(${id})`);
    try {
      const organization = await this.findOne(id);
      Object.assign(organization, updateOrganizationDto);
      const result = await this.organizationRepository.save(organization);
      this.logger.log(`OUT <- organizationsService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove an organization
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> organizationsService.remove(${id})`);
    try {
      const organization = await this.findOne(id);
      await this.organizationRepository.remove(organization);
      this.logger.log(`OUT <- organizationsService.remove()`);
    } catch (error) {
      this.logger.error(`Error - organizationsService.remove(): ${error.message}`);
      throw error;
    }
  }
} 