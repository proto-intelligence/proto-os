import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { WebhookEvent } from './interfaces/webhook-event.interface';

@Injectable()
export class ClerkService {
  private readonly logger = new Logger(ClerkService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handleWebhookEvent(event: WebhookEvent): Promise<void> {
    this.logger.debug(`Handling webhook event: ${event.type}`);

    switch (event.type) {
      case 'user.created':
        await this.handleUserCreated(event.data);
        break;
      case 'user.updated':
        await this.handleUserUpdated(event.data);
        break;
      case 'user.deleted':
        await this.handleUserDeleted(event.data);
        break;
      default:
        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
    }
  }

  async handleUserCreated(data: any) {
    this.logger.log(`Processing user.created event for user ${data.id}`);
    
    const user = this.userRepository.create({
      clerk_id: data.id,
      email: data.email_addresses[0]?.email_address,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    await this.userRepository.save(user);
    this.logger.log(`Created user record for Clerk user ${data.id}`);
  }

  async handleUserUpdated(data: any) {
    this.logger.log(`Processing user.updated event for user ${data.id}`);
    
    const user = await this.userRepository.findOne({ where: { clerk_id: data.id } });
    if (!user) {
      this.logger.warn(`User ${data.id} not found for update`);
      return;
    }

    user.email = data.email_addresses[0]?.email_address;
    user.first_name = data.first_name;
    user.last_name = data.last_name;

    await this.userRepository.save(user);
    this.logger.log(`Updated user record for Clerk user ${data.id}`);
  }

  async handleUserDeleted(data: any) {
    this.logger.log(`Processing user.deleted event for user ${data.id}`);
    
    const user = await this.userRepository.findOne({ where: { clerk_id: data.id } });
    if (!user) {
      this.logger.warn(`User ${data.id} not found for deletion`);
      return;
    }

    await this.userRepository.remove(user);
    this.logger.log(`Deleted user record for Clerk user ${data.id}`);
  }
} 