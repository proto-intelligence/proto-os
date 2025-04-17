import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginPermission } from './entities/login-permission.entity';
import { CreateLoginPermissionDto } from './dto/create-login-permission.dto';
import { UpdateLoginPermissionDto } from './dto/update-login-permission.dto';

@Injectable()
export class LoginPermissionsService {
  private readonly logger = new Logger(LoginPermissionsService.name);

  constructor(
    @InjectRepository(LoginPermission)
    private loginPermissionRepository: Repository<LoginPermission>,
  ) {}

  /**
   * Create a new login permission
   */
  async create(createLoginPermissionDto: CreateLoginPermissionDto): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsService.create()`);
    try {
      const loginPermission = this.loginPermissionRepository.create(createLoginPermissionDto);
      const result = await this.loginPermissionRepository.save(loginPermission);
      this.logger.log(`OUT <- loginPermissionsService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all login permissions
   */
  async findAll(): Promise<LoginPermission[]> {
    this.logger.log(`IN -> loginPermissionsService.findAll()`);
    try {
      const loginPermissions = await this.loginPermissionRepository.find({
        relations: ['membership', 'credential', 'granted_by_membership']
      });
      this.logger.log(`OUT <- loginPermissionsService.findAll()`);
      return loginPermissions;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one login permission by id
   */
  async findOne(id: string): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsService.findOne(${id})`);
    try {
      const loginPermission = await this.loginPermissionRepository.findOne({
        where: { id },
        relations: ['membership', 'credential', 'granted_by_membership']
      });
      if (!loginPermission) {
        throw new NotFoundException(`Login permission with ID ${id} not found`);
      }
      this.logger.log(`OUT <- loginPermissionsService.findOne()`);
      return loginPermission;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a login permission
   */
  async update(id: string, updateLoginPermissionDto: UpdateLoginPermissionDto): Promise<LoginPermission> {
    this.logger.log(`IN -> loginPermissionsService.update(${id})`);
    try {
      const loginPermission = await this.findOne(id);
      Object.assign(loginPermission, updateLoginPermissionDto);
      const result = await this.loginPermissionRepository.save(loginPermission);
      this.logger.log(`OUT <- loginPermissionsService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginPermissionsService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove a login permission
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> loginPermissionsService.remove(${id})`);
    try {
      const loginPermission = await this.findOne(id);
      await this.loginPermissionRepository.remove(loginPermission);
      this.logger.log(`OUT <- loginPermissionsService.remove()`);
    } catch (error) {
      this.logger.error(`Error - loginPermissionsService.remove(): ${error.message}`);
      throw error;
    }
  }
} 