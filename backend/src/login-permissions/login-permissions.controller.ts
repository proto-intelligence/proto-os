import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoginPermissionsService } from './login-permissions.service';
import { CreateLoginPermissionDto, UpdateLoginPermissionDto } from './dto';
import { LoginPermission } from './entities/login-permission.entity';

@ApiTags('login-permissions')
@Controller('login-permissions')
export class LoginPermissionsController {
  private readonly logger = new Logger(LoginPermissionsController.name);

  constructor(private readonly loginPermissionsService: LoginPermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create login permission' })
  @ApiResponse({ status: 201, description: 'Login permission successfully created.', type: LoginPermission })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createLoginPermissionDto: CreateLoginPermissionDto): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsController.create()`);
    try {
      const result = await this.loginPermissionsService.create(createLoginPermissionDto);
      this.logger.log(`OUT <- loginPermissionsController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all login permissions' })
  @ApiResponse({ status: 200, description: 'List of all login permissions.', type: [LoginPermission] })
  async findAll(): Promise<LoginPermission[]> {
    this.logger.log(`IN -> loginPermissionsController.findAll()`);
    try {
      const result = await this.loginPermissionsService.findAll();
      this.logger.log(`OUT <- loginPermissionsController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get login permission by id' })
  @ApiParam({ name: 'id', description: 'Login permission ID' })
  @ApiResponse({ status: 200, description: 'Login permission found.', type: LoginPermission })
  @ApiResponse({ status: 404, description: 'Login permission not found.' })
  async findOne(@Param('id') id: string): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsController.findOne(${id})`);
    try {
      const result = await this.loginPermissionsService.findOne(id);
      this.logger.log(`OUT <- loginPermissionsController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update login permission' })
  @ApiParam({ name: 'id', description: 'Login permission ID' })
  @ApiResponse({ status: 200, description: 'Login permission successfully updated.', type: LoginPermission })
  @ApiResponse({ status: 404, description: 'Login permission not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateLoginPermissionDto: UpdateLoginPermissionDto,
  ): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsController.update(${id})`);
    try {
      const result = await this.loginPermissionsService.update(id, updateLoginPermissionDto);
      this.logger.log(`OUT <- loginPermissionsController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete login permission' })
  @ApiParam({ name: 'id', description: 'Login permission ID' })
  @ApiResponse({ status: 200, description: 'Login permission successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Login permission not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> loginPermissionsController.remove(${id})`);
    try {
      await this.loginPermissionsService.remove(id);
      this.logger.log(`OUT <- loginPermissionsController.remove()`);
    } catch (error) {
      this.logger.error(`Error - loginPermissionsController.remove(): ${error.message}`);
      throw error;
    }
  }
} 