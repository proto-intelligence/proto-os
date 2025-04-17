import { PartialType } from '@nestjs/swagger';
import { CreateOrganizationMembershipDto } from './create-organization-membership.dto';

export class UpdateOrganizationMembershipDto extends PartialType(CreateOrganizationMembershipDto) {} 