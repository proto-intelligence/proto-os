import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { OrganizationWithCredentialsDto } from './dto/organization-with-credentials.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`IN -> usersController.create()`);
    try {
      const result = await this.usersService.create(createUserDto);
      this.logger.log(`OUT <- usersController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.', type: [User] })
  async findAll(): Promise<User[]> {
    this.logger.log(`IN -> usersController.findAll()`);
    try {
      const result = await this.usersService.findAll();
      this.logger.log(`OUT <- usersController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<User> {
    this.logger.log(`IN -> usersController.findOne(${id})`);
    try {
      const result = await this.usersService.findOne(id);
      this.logger.log(`OUT <- usersController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Get('clerk/:clerkId')
  @ApiOperation({ summary: 'Get user by Clerk ID' })
  @ApiParam({ name: 'clerkId', description: 'Clerk User ID' })
  @ApiResponse({ status: 200, description: 'User found.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findByClerkId(@Param('clerkId') clerkId: string): Promise<User> {
    this.logger.log(`IN -> usersController.findByClerkId(${clerkId})`);
    try {
      const result = await this.usersService.findByClerkId(clerkId);
      this.logger.log(`OUT <- usersController.findByClerkId()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.findByClerkId(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`IN -> usersController.update(${id})`);
    try {
      const result = await this.usersService.update(id, updateUserDto);
      this.logger.log(`OUT <- usersController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> usersController.remove(${id})`);
    try {
      await this.usersService.remove(id);
      this.logger.log(`OUT <- usersController.remove()`);
    } catch (error) {
      this.logger.error(`Error - usersController.remove(): ${error.message}`);
      throw error;
    }
  }

  @Get(':userId/organizations-with-credentials')
  @ApiOperation({ summary: 'Get organizations with credentials for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Organizations with credentials found.', 
    type: [OrganizationWithCredentialsDto] 
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getOrganizationsWithCredentials(
    @Param('userId') userId: string,
  ): Promise<OrganizationWithCredentialsDto[]> {
    this.logger.log(`IN -> usersController.getOrganizationsWithCredentials(${userId})`);
    try {
      const result = await this.usersService.getOrganizationsWithCredentials(userId);
      this.logger.log(`OUT <- usersController.getOrganizationsWithCredentials()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersController.getOrganizationsWithCredentials(): ${error.message}`);
      throw error;
    }
  }
} 