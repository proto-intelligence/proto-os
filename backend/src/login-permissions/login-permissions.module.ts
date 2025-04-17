import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginPermissionsService } from './login-permissions.service';
import { LoginPermissionsController } from './login-permissions.controller';
import { LoginPermission } from './entities/login-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginPermission])],
  controllers: [LoginPermissionsController],
  providers: [LoginPermissionsService],
  exports: [LoginPermissionsService]
})
export class LoginPermissionsModule {} 