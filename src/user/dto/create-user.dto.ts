import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from '../enum/role.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString({ message: 'Name must be a valid'})
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(4,{ message: 'Name needs to have at least 4 characters' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'example@gmail.com',
    required: true
  })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'password'
  })
  @IsString({ message: 'Password must be a valid'})
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6,{ message: 'Password needs to have at least 4 characters' })
  password: string;

  @ApiProperty({
    type: [String],
    enum: ['Admin','User']
  })
  @IsEnum(Roles, { message: 'Role is not available!. Choose other' })
  @IsOptional()
  @Transform((param) => param.value.toUpperCase())
  role?: Roles;
  

}
