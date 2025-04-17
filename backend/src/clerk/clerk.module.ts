import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClerkController } from './clerk.controller';
import { ClerkService } from './clerk.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ClerkController],
  providers: [ClerkService],
  exports: [ClerkService],
})
export class ClerkModule {} 