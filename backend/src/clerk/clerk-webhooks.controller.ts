import { Controller, Post, Body, Headers, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClerkWebhooksService } from './clerk-webhooks.service';
import { WebhookEvent } from './interfaces/webhook-event.interface';

@ApiTags('clerk-webhooks')
@Controller('clerk-webhooks')
export class ClerkWebhooksController {
  private readonly logger = new Logger(ClerkWebhooksController.name);

  constructor(private readonly clerkWebhooksService: ClerkWebhooksService) {}

  @Post()
  @ApiOperation({ summary: 'Handle Clerk webhook events' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid webhook signature or payload.' })
  async handleWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() payload: any,
  ): Promise<{ success: boolean }> {
    this.logger.log(`IN -> clerkWebhooksController.handleWebhook()`);
    
    try {
      // Verify webhook signature
      const isValid = await this.clerkWebhooksService.verifyWebhookSignature(
        svixId,
        svixTimestamp,
        svixSignature,
        payload,
      );

      if (!isValid) {
        this.logger.error('Invalid webhook signature');
        throw new HttpException('Invalid webhook signature', HttpStatus.BAD_REQUEST);
      }

      // Process the webhook event
      await this.clerkWebhooksService.processWebhookEvent(payload);
      
      this.logger.log(`OUT <- clerkWebhooksController.handleWebhook()`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error - clerkWebhooksController.handleWebhook(): ${error.message}`);
      throw error;
    }
  }
} 