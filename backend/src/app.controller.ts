import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // This groups the endpoint under "App" in Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello world message' })
  @ApiResponse({ status: 200, description: 'Returns a greeting string' })
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
