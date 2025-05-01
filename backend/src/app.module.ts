import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { WorkflowsModule } from './workflows/workflows.module';
import { TasksModule } from './tasks/tasks.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { OrganizationMembershipsModule } from './organization-memberships/organization-memberships.module';
import { LoginCredentialsModule } from './login-credentials/login-credentials.module';
import { LoginPermissionsModule } from './login-permissions/login-permissions.module';
import { ClerkModule } from './clerk/clerk.module';

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
    WorkflowsModule,
    TasksModule,
    OrganizationsModule,
    UsersModule,
    OrganizationMembershipsModule,
    LoginCredentialsModule,
    LoginPermissionsModule,
    ClerkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
