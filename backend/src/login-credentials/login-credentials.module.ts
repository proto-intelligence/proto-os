import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginCredentialsService } from './login-credentials.service';
import { LoginCredentialsController } from './login-credentials.controller';
import { LoginCredential } from './entities/login-credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginCredential])],
  controllers: [LoginCredentialsController],
  providers: [LoginCredentialsService],
  exports: [LoginCredentialsService]
})
export class LoginCredentialsModule {} 