import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginCredential } from './entities/login-credential.entity';
import { CreateLoginCredentialDto } from './dto/create-login-credential.dto';
import { UpdateLoginCredentialDto } from './dto/update-login-credential.dto';

@Injectable()
export class LoginCredentialsService {
  private readonly logger = new Logger(LoginCredentialsService.name);

  constructor(
    @InjectRepository(LoginCredential)
    private loginCredentialRepository: Repository<LoginCredential>,
  ) {}

  /**
   * Create a new login credential
   */
  async create(createLoginCredentialDto: CreateLoginCredentialDto): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsService.create()`);
    try {
      const loginCredential = this.loginCredentialRepository.create(createLoginCredentialDto);
      const result = await this.loginCredentialRepository.save(loginCredential);
      this.logger.log(`OUT <- loginCredentialsService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all login credentials
   */
  async findAll(): Promise<LoginCredential[]> {
    this.logger.log(`IN -> loginCredentialsService.findAll()`);
    try {
      const loginCredentials = await this.loginCredentialRepository.find({
        relations: ['organization', 'permissions']
      });
      this.logger.log(`OUT <- loginCredentialsService.findAll()`);
      return loginCredentials;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one login credential by id
   */
  async findOne(id: string): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsService.findOne(${id})`);
    try {
      const loginCredential = await this.loginCredentialRepository.findOne({
        where: { id },
        relations: ['organization', 'permissions']
      });
      if (!loginCredential) {
        throw new NotFoundException(`Login credential with ID ${id} not found`);
      }
      this.logger.log(`OUT <- loginCredentialsService.findOne()`);
      return loginCredential;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a login credential
   */
  async update(id: string, updateLoginCredentialDto: UpdateLoginCredentialDto): Promise<LoginCredential> {
    this.logger.log(`IN -> loginCredentialsService.update(${id})`);
    try {
      const loginCredential = await this.findOne(id);
      Object.assign(loginCredential, updateLoginCredentialDto);
      const result = await this.loginCredentialRepository.save(loginCredential);
      this.logger.log(`OUT <- loginCredentialsService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - loginCredentialsService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove a login credential
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> loginCredentialsService.remove(${id})`);
    try {
      const loginCredential = await this.findOne(id);
      await this.loginCredentialRepository.remove(loginCredential);
      this.logger.log(`OUT <- loginCredentialsService.remove()`);
    } catch (error) {
      this.logger.error(`Error - loginCredentialsService.remove(): ${error.message}`);
      throw error;
    }
  }
} 