import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'The login has been successfully created'})
  @ApiResponse({ status: 404, description: 'The login get an error due to the incorrect data entry'})
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
