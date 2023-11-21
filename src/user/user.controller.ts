import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Roles } from './enum/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth( Roles.ADMIN )
  @ApiResponse({ status: 400, description:'Create user get an error due to the incorrect data entry'})
  @ApiResponse({ status: 201, description: 'User has been successfully created'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Auth( Roles.ADMIN, Roles.USER )
  @ApiResponse({ status: 200, description: 'User data response is OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Auth( Roles.ADMIN, Roles.USER )
  @ApiResponse({ status: 200, description: 'User data got it' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Auth( Roles.ADMIN, Roles.USER )
  @ApiResponse({ status: 200, description: 'User data updated successfully' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth( Roles.ADMIN, Roles.USER )
  @ApiResponse({ status: 404, description: 'User not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
