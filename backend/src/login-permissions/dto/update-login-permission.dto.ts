import { PartialType } from '@nestjs/swagger';
import { CreateLoginPermissionDto } from './create-login-permission.dto';

export class UpdateLoginPermissionDto extends PartialType(CreateLoginPermissionDto) {} 