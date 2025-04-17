import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationMembershipsService } from './organization-memberships.service';
import { OrganizationMembershipsController } from './organization-memberships.controller';
import { OrganizationMembership } from './entities/organization-membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationMembership])],
  controllers: [OrganizationMembershipsController],
  providers: [OrganizationMembershipsService],
  exports: [OrganizationMembershipsService]
})
export class OrganizationMembershipsModule {} 