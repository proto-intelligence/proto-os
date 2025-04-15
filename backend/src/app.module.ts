import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptsModule } from './prompts/prompts.module';
import * as config from 'config';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.get<string>('typeorm.url'),
      autoLoadEntities: config.get<boolean>('typeorm.autoLoadEntities'),
      synchronize: config.get<boolean>('typeorm.synchronize'),
      ...(config.get('node_env') !== 'local' && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    PromptsModule,
    WorkflowsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
