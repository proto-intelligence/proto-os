import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { Organization } from './entities/organization.entity';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  private readonly logger = new Logger(OrganizationsController.name);

  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create organization' })
  @ApiResponse({ status: 201, description: 'Organization successfully created.', type: Organization })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    this.logger.log(`IN -> organizationsController.create()`);
    try {
      const result = await this.organizationsService.create(createOrganizationDto);
      this.logger.log(`OUT <- organizationsController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of all organizations.', type: [Organization] })
  async findAll(): Promise<Organization[]> {
    this.logger.log(`IN -> organizationsController.findAll()`);
    try {
      const result = await this.organizationsService.findAll();
      this.logger.log(`OUT <- organizationsController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by id' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Organization found.', type: Organization })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async findOne(@Param('id') id: string): Promise<Organization> {
    this.logger.log(`IN -> organizationsController.findOne(${id})`);
    try {
      const result = await this.organizationsService.findOne(id);
      this.logger.log(`OUT <- organizationsController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get organization by name' })
  @ApiParam({ name: 'name', description: 'Organization name' })
  @ApiResponse({ status: 200, description: 'Organization found.', type: Organization })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async findByName(@Param('name') name: string): Promise<Organization> {
    this.logger.log(`IN -> organizationsController.findByName(${name})`);
    try {
      const result = await this.organizationsService.findByName(name);
      this.logger.log(`OUT <- organizationsController.findByName()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsController.findByName(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Organization successfully updated.', type: Organization })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    this.logger.log(`IN -> organizationsController.update(${id})`);
    try {
      const result = await this.organizationsService.update(id, updateOrganizationDto);
      this.logger.log(`OUT <- organizationsController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - organizationsController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Organization successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> organizationsController.remove(${id})`);
    try {
      await this.organizationsService.remove(id);
      this.logger.log(`OUT <- organizationsController.remove()`);
    } catch (error) {
      this.logger.error(`Error - organizationsController.remove(): ${error.message}`);
      throw error;
    }
  }
} 