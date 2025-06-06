import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrganizationWithCredentialsDto } from './dto/organization-with-credentials.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`IN -> usersService.create()`);
    try {
      const user = this.userRepository.create(createUserDto);
      const result = await this.userRepository.save(user);
      this.logger.log(`OUT <- usersService.create()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersService.create(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    this.logger.log(`IN -> usersService.findAll()`);
    try {
      const users = await this.userRepository.find({
        relations: ['memberships']
      });
      this.logger.log(`OUT <- usersService.findAll()`);
      return users;
    } catch (error) {
      this.logger.error(`Error - usersService.findAll(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one user by id
   */
  async findOne(id: string): Promise<User> {
    this.logger.log(`IN -> usersService.findOne(${id})`);
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['memberships']
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.log(`OUT <- usersService.findOne()`);
      return user;
    } catch (error) {
      this.logger.error(`Error - usersService.findOne(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Find user by Clerk ID
   */
  async findByClerkId(clerkId: string): Promise<User> {
    this.logger.log(`IN -> usersService.findByClerkId(${clerkId})`);
    try {
      const user = await this.userRepository.findOne({
        where: { clerk_id: clerkId },
        relations: ['memberships']
      });
      if (!user) {
        throw new NotFoundException(`User with Clerk ID ${clerkId} not found`);
      }
      this.logger.log(`OUT <- usersService.findByClerkId()`);
      return user;
    } catch (error) {
      this.logger.error(`Error - usersService.findByClerkId(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`IN -> usersService.update(${id})`);
    try {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);
      const result = await this.userRepository.save(user);
      this.logger.log(`OUT <- usersService.update()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersService.update(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Remove a user
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`IN -> usersService.remove(${id})`);
    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
      this.logger.log(`OUT <- usersService.remove()`);
    } catch (error) {
      this.logger.error(`Error - usersService.remove(): ${error.message}`);
      throw error;
    }
  }

  /**
   * Get organizations with credentials for a user
   */
  async getOrganizationsWithCredentials(userId: string): Promise<OrganizationWithCredentialsDto[]> {
    this.logger.log(`IN -> usersService.getOrganizationsWithCredentials(${userId})`);
    try {
      // First, get the user with their memberships
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['memberships', 'memberships.organization']
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // For each membership, get the organization's credentials with permissions
      const result: OrganizationWithCredentialsDto[] = [];

      for (const membership of user.memberships) {
        // Get credentials for this organization with their permissions
        const credentials = await this.userRepository.manager
          .createQueryBuilder('login_credentials', 'credential')
          .leftJoinAndSelect('credential.permissions', 'permission')
          .where('credential.organization_id = :organizationId', { 
            organizationId: membership.organization_id 
          })
          .getMany();

        // Map to DTO format
        const organizationWithCredentials: OrganizationWithCredentialsDto = {
          id: membership.organization.id,
          name: membership.organization.name,
          role: membership.role,
          credentials: credentials.map(credential => ({
            id: credential.id,
            service_name: credential.service_name,
            username: credential.username,
            encrypted_password: credential.encrypted_password,
            permissions: credential.permissions.map(permission => ({
              id: permission.id,
              permission: permission.permission,
              granted_by_membership_id: permission.granted_by_membership_id
            }))
          }))
        };

        result.push(organizationWithCredentials);
      }

      this.logger.log(`OUT <- usersService.getOrganizationsWithCredentials()`);
      return result;
    } catch (error) {
      this.logger.error(`Error - usersService.getOrganizationsWithCredentials(): ${error.message}`);
      throw error;
    }
  }
} 