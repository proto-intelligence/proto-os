import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClerkService } from './clerk.service';
import { WebhookEvent } from './interfaces/webhook-event.interface';

@ApiTags('clerk')
@Controller('clerk')
export class ClerkController {
  private readonly logger = new Logger(ClerkController.name);

  constructor(private readonly clerkService: ClerkService) {}

  @Post('webhooks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle Clerk webhook events' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Webhook processed successfully' })
  async handleWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() event: WebhookEvent,
  ): Promise<{ success: boolean }> {
    this.logger.debug(`Received webhook event: ${event.type}`);
    this.logger.debug(`Webhook ID: ${svixId}`);
    this.logger.debug(`Webhook Timestamp: ${svixTimestamp}`);
    this.logger.debug(`Webhook Signature: ${svixSignature}`);

    // TODO: Verify webhook signature using svix
    // For now, we'll trust the webhook without verification
    // In production, you should verify the signature

    switch (event.type) {
      case 'user.created':
        await this.clerkService.handleUserCreated(event.data);
        break;
      case 'user.updated':
        await this.clerkService.handleUserUpdated(event.data);
        break;
      case 'user.deleted':
        await this.clerkService.handleUserDeleted(event.data);
        break;
      default:
        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
    }

    return { success: true };
  }
} 