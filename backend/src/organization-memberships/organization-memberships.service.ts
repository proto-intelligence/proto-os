import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationMembership } from './entities/organization-membership.entity';
import { CreateOrganizationMembershipDto } from './dto/create-organization-membership.dto';
import { UpdateOrganizationMembershipDto } from './dto/update-organization-membership.dto';

@Injectable()
export class OrganizationMembershipsService {
  private readonly logger = new Logger(OrganizationMembershipsService.name);

  constructor(
    @InjectRepository(OrganizationMembership)
    private organizationMembershipRepository: Repository<OrganizationMembership>,
  ) {}

  /**
   * Create a new organization membership
   */
  async create(createOrganizationMembershipDto: CreateOrganizationMembershipDto): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsService.create()`);
    try {
      const organizationMembership = this.organizationMembershipRepository.create(createOrganizationMembershipDto);
      const result = await this.organizationMembershipRepository.save(organizationMembership);
      this.logger.log(`OUT <- organizationMembershipsService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all organization memberships
   */
  async findAll(): Promise<OrganizationMembership[]> {
    this.logger.log(`IN -> organizationMembershipsService.findAll()`);
    try {
      const organizationMemberships = await this.organizationMembershipRepository.find({
        relations: ['user', 'organization', 'permissions', 'granted_permissions']
      });
      this.logger.log(`OUT <- organizationMembershipsService.findAll()`);
      return organizationMemberships;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one organization membership by id
   */
  async findOne(id: string): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsService.findOne(${id})`);
    try {
      const organizationMembership = await this.organizationMembershipRepository.findOne({
        where: { id },
        relations: ['user', 'organization', 'permissions', 'granted_permissions']
      });
      if (!organizationMembership) {
        throw new NotFoundException(`Organization membership with ID ${id} not found`);
      }
      this.logger.log(`OUT <- organizationMembershipsService.findOne()`);
      return organizationMembership;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update an organization membership
   */
  async update(id: string, updateOrganizationMembershipDto: UpdateOrganizationMembershipDto): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsService.update(${id})`);
    try {
      const organizationMembership = await this.findOne(id);
      Object.assign(organizationMembership, updateOrganizationMembershipDto);
      const result = await this.organizationMembershipRepository.save(organizationMembership);
      this.logger.log(`OUT <- organizationMembershipsService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove an organization membership
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> organizationMembershipsService.remove(${id})`);
    try {
      const organizationMembership = await this.findOne(id);
      await this.organizationMembershipRepository.remove(organizationMembership);
      this.logger.log(`OUT <- organizationMembershipsService.remove()`);
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsService.remove(): ${error.message}`);
      throw error;
    }
  }
} 