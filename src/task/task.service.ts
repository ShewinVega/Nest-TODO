import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(
    private prisma:PrismaService
  ){}


  async create(createTaskDto: CreateTaskDto, user: UserEntity) {

    // destructuring taskBody
    const { description } = createTaskDto;
    
    const data = await this.prisma.task.create({
      data: {
        description,
        userId: user.id
      },
      select: {
        id: true,
        description: true,
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    });

    if(!data) {
      throw new BadRequestException(`Task was not created!`);
    }

    return {
      message: `Task created successfully`,
      data
    }
  }

  async findAll(user: UserEntity) {
    
    const data = await this.prisma.task.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        description: true,
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    });
    if(data.length === 0) {
      return {
        message: 'There are not tasks. Create one.'
      }
    }

    return {
      message: `Task's List`,
      data
    }

  }

  async findOne(id: number) {
    
    const data = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    if(!data) {
      throw new NotFoundException(`Task was not found`);
    }

    return {
      message: `Task found successfully`,
      data
    }

  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {

    // validate if task exist
    await this.findOne(id);

    const taskUpdated = await this.prisma.task.update({ 
      where: {
        id
      },
      data: updateTaskDto,
      select: {
        id: true,
        description: true,
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    });

    if(!taskUpdated) {
      throw new BadRequestException(`Task was not updated!`);
    }

    return {
      message: `Task updated successfully`,
      data: taskUpdated
    }

  }

  async remove(id: number) {
    
    // validate if task exist
    await this.findOne(id);

    const taskDeleted = await this.prisma.task.delete({
      where: {
        id
      }
    });

    if(!taskDeleted) {
      throw new BadRequestException(`Task was not deleted!`);
    }

    return {
      message: `Task deleted successfully`
    }

  }
}
