import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrganizationMembershipsService } from './organization-memberships.service';
import { CreateOrganizationMembershipDto } from './dto/create-organization-membership.dto';
import { UpdateOrganizationMembershipDto } from './dto/update-organization-membership.dto';
import { OrganizationMembership } from './entities/organization-membership.entity';

@ApiTags('organization-memberships')
@Controller('organization-memberships')
export class OrganizationMembershipsController {
  private readonly logger = new Logger(OrganizationMembershipsController.name);

  constructor(private readonly organizationMembershipsService: OrganizationMembershipsService) {}

  @Post()
  @ApiOperation({ summary: 'Create organization membership' })
  @ApiResponse({ status: 201, description: 'Organization membership successfully created.', type: OrganizationMembership })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createOrganizationMembershipDto: CreateOrganizationMembershipDto): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsController.create()`);
    try {
      const result = await this.organizationMembershipsService.create(createOrganizationMembershipDto);
      this.logger.log(`OUT <- organizationMembershipsController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all organization memberships' })
  @ApiResponse({ status: 200, description: 'List of all organization memberships.', type: [OrganizationMembership] })
  async findAll(): Promise<OrganizationMembership[]> {
    this.logger.log(`IN -> organizationMembershipsController.findAll()`);
    try {
      const result = await this.organizationMembershipsService.findAll();
      this.logger.log(`OUT <- organizationMembershipsController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization membership by id' })
  @ApiParam({ name: 'id', description: 'Organization membership ID' })
  @ApiResponse({ status: 200, description: 'Organization membership found.', type: OrganizationMembership })
  @ApiResponse({ status: 404, description: 'Organization membership not found.' })
  async findOne(@Param('id') id: string): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsController.findOne(${id})`);
    try {
      const result = await this.organizationMembershipsService.findOne(id);
      this.logger.log(`OUT <- organizationMembershipsController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update organization membership' })
  @ApiParam({ name: 'id', description: 'Organization membership ID' })
  @ApiResponse({ status: 200, description: 'Organization membership successfully updated.', type: OrganizationMembership })
  @ApiResponse({ status: 404, description: 'Organization membership not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationMembershipDto: UpdateOrganizationMembershipDto,
  ): Promise<OrganizationMembership> {
    this.logger.log(`IN -> organizationMembershipsController.update(${id})`);
    try {
      const result = await this.organizationMembershipsService.update(id, updateOrganizationMembershipDto);
      this.logger.log(`OUT <- organizationMembershipsController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization membership' })
  @ApiParam({ name: 'id', description: 'Organization membership ID' })
  @ApiResponse({ status: 200, description: 'Organization membership successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Organization membership not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> organizationMembershipsController.remove(${id})`);
    try {
      await this.organizationMembershipsService.remove(id);
      this.logger.log(`OUT <- organizationMembershipsController.remove()`);
    } catch (error) {
      this.logger.error(`Error - organizationMembershipsController.remove(): ${error.message}`);
      throw error;
    }
  }
} 