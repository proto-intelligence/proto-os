import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoginCredentialsService } from './login-credentials.service';
import { CreateLoginCredentialDto, UpdateLoginCredentialDto } from './dto';
import { LoginCredential } from './entities/login-credential.entity';

@ApiTags('login-credentials')
@Controller('login-credentials')
export class LoginCredentialsController {
  private readonly logger = new Logger(LoginCredentialsController.name);

  constructor(private readonly loginCredentialsService: LoginCredentialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create login credential' })
  @ApiResponse({ status: 201, description: 'Login credential successfully created.', type: LoginCredential })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createLoginCredentialDto: CreateLoginCredentialDto): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsController.create()`);
    try {
      const result = await this.loginCredentialsService.create(createLoginCredentialDto);
      this.logger.log(`OUT <- loginCredentialsController.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsController.create(): ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all login credentials' })
  @ApiResponse({ status: 200, description: 'List of all login credentials.', type: [LoginCredential] })
  async findAll(): Promise<LoginCredential[]> {
    this.logger.log(`IN -> loginCredentialsController.findAll()`);
    try {
      const result = await this.loginCredentialsService.findAll();
      this.logger.log(`OUT <- loginCredentialsController.findAll()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsController.findAll(): ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get login credential by id' })
  @ApiParam({ name: 'id', description: 'Login credential ID' })
  @ApiResponse({ status: 200, description: 'Login credential found.', type: LoginCredential })
  @ApiResponse({ status: 404, description: 'Login credential not found.' })
  async findOne(@Param('id') id: string): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsController.findOne(${id})`);
    try {
      const result = await this.loginCredentialsService.findOne(id);
      this.logger.log(`OUT <- loginCredentialsController.findOne()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsController.findOne(): ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update login credential' })
  @ApiParam({ name: 'id', description: 'Login credential ID' })
  @ApiResponse({ status: 200, description: 'Login credential successfully updated.', type: LoginCredential })
  @ApiResponse({ status: 404, description: 'Login credential not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateLoginCredentialDto: UpdateLoginCredentialDto,
  ): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsController.update(${id})`);
    try {
      const result = await this.loginCredentialsService.update(id, updateLoginCredentialDto);
      this.logger.log(`OUT <- loginCredentialsController.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsController.update(): ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete login credential' })
  @ApiParam({ name: 'id', description: 'Login credential ID' })
  @ApiResponse({ status: 200, description: 'Login credential successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Login credential not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`IN -> loginCredentialsController.remove(${id})`);
    try {
      await this.loginCredentialsService.remove(id);
      this.logger.log(`OUT <- loginCredentialsController.remove()`);
    } catch (error) {
      this.logger.error(`Error - loginCredentialsController.remove(): ${error.message}`);
      throw error;
    }
  }
} 