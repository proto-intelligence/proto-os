import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { WebhookEvent } from './interfaces/webhook-event.interface';
import * as crypto from 'crypto';

@Injectable()
export class ClerkWebhooksService {
  private readonly logger = new Logger(ClerkWebhooksService.name);
  private readonly webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async verifyWebhookSignature(
    svixId: string,
    svixTimestamp: string,
    svixSignature: string,
    payload: any,
  ): Promise<boolean> {
    this.logger.log(`IN -> clerkWebhooksService.verifyWebhookSignature()`);
    
    try {
      const signature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(`${svixId}.${svixTimestamp}.${JSON.stringify(payload)}`)
        .digest('hex');

      const isValid = signature === svixSignature;
      this.logger.log(`OUT <- clerkWebhooksService.verifyWebhookSignature(): ${isValid}`);
      return isValid;
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksService.verifyWebhookSignature(): ${error.message}`);
      return false;
    }
  }

  async processWebhookEvent(payload: WebhookEvent): Promise<void> {
    this.logger.log(`IN -> clerkWebhooksService.processWebhookEvent()`);
    
    try {
      switch (payload.type) {
        case 'user.created':
          await this.handleUserCreated(payload.data);
          break;
        case 'user.updated':
          await this.handleUserUpdated(payload.data);
          break;
        case 'user.deleted':
          await this.handleUserDeleted(payload.data);
          break;
        default:
          this.logger.warn(`Unhandled webhook event type: ${payload.type}`);
      }
      
      this.logger.log(`OUT <- clerkWebhooksService.processWebhookEvent()`);
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksService.processWebhookEvent(): ${error.message}`);
      throw error;
    }
  }

  private async handleUserCreated(data: any): Promise<void> {
    this.logger.log(`IN -> clerkWebhooksService.handleUserCreated()`);
    
    try {
      const user = this.userRepository.create({
        clerk_id: data.id,
        email: data.email_addresses[0]?.email_address,
        first_name: data.first_name,
        last_name: data.last_name,
        is_active: true,
      });

      await this.userRepository.save(user);
      this.logger.log(`OUT <- clerkWebhooksService.handleUserCreated()`);
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksService.handleUserCreated(): ${error.message}`);
      throw error;
    }
  }

  private async handleUserUpdated(data: any): Promise<void> {
    this.logger.log(`IN -> clerkWebhooksService.handleUserUpdated()`);
    
    try {
      const user = await this.userRepository.findOne({ where: { clerk_id: data.id } });
      if (!user) {
        this.logger.warn(`User not found for update: ${data.id}`);
        return;
      }

      user.email = data.email_addresses[0]?.email_address;
      user.first_name = data.first_name;
      user.last_name = data.last_name;

      await this.userRepository.save(user);
      this.logger.log(`OUT <- clerkWebhooksService.handleUserUpdated()`);
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksService.handleUserUpdated(): ${error.message}`);
      throw error;
    }
  }

  private async handleUserDeleted(data: any): Promise<void> {
    this.logger.log(`IN -> clerkWebhooksService.handleUserDeleted()`);
    
    try {
      const user = await this.userRepository.findOne({ where: { clerk_id: data.id } });
      if (!user) {
        this.logger.warn(`User not found for deletion: ${data.id}`);
        return;
      }

      user.is_active = false;
      await this.userRepository.save(user);
      this.logger.log(`OUT <- clerkWebhooksService.handleUserDeleted()`);
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksService.handleUserDeleted(): ${error.message}`);
      throw error;
    }
  }
} 