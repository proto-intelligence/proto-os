import { PartialType } from '@nestjs/swagger';
import { CreateLoginCredentialDto } from './create-login-credential.dto';

export class UpdateLoginCredentialDto extends PartialType(CreateLoginCredentialDto) {} 