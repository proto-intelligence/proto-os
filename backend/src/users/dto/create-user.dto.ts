import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user_2NKQsK2Z5YZ5YZ5YZ5YZ5YZ5YZ' })
  @IsString()
  @IsNotEmpty()
  clerk_id: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
} 