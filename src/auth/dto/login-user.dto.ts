import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto {

  @ApiProperty({
    example: 'example@gmail.com',
    required: true
  })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    required: true
  })
  @IsString({ message: 'Password must be a valid'})
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6,{ message: 'Password needs to have at least 4 characters' })
  password: string;

}
