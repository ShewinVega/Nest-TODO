import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Roles } from '@user/enum/role.enum';
import { GetUser } from '@auth/decorators/get-user.decorator';
import { UserEntity } from '@user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth(Roles.USER, Roles.ADMIN)
  @ApiResponse({ status: 400, description:'Create task get an error due to the incorrect data entry'})
  @ApiResponse({ status: 201, description: 'Task has been successfully created'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity
  ) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  @Auth(Roles.USER, Roles.ADMIN)
  @ApiResponse({ status: 200, description: 'Task data response is OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll( 
    @GetUser() user: UserEntity
  ) {
    return this.taskService.findAll(user);
  }

  @Get(':id')
  @Auth(Roles.USER, Roles.ADMIN)
  @ApiResponse({ status: 200, description: 'Task data got it' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Task not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @Auth(Roles.USER, Roles.ADMIN)
  @ApiResponse({ status: 200, description: 'Task data updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Auth(Roles.USER, Roles.ADMIN)
  @ApiResponse({ status: 404, description: 'Task not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
