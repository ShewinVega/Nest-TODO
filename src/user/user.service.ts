import { BadRequestException, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AllExceptionsFilter } from '@utils/errorFilter.util';


@Injectable()
@UseFilters(new AllExceptionsFilter())
export class UserService {

  constructor(
    private prisma: PrismaService
  ){}

  async create(createUserDto: CreateUserDto) {

    const { email, password } = createUserDto;

    const emailExist = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if(emailExist) {
      throw new BadRequestException(`Email already exist!`);
    }

    // encrypting password
    const passwordHashed = await bcrypt.hash(password, 10);
    createUserDto.password = passwordHashed;

    const data = await this.prisma.user.create({
      data: createUserDto,
      select: {
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if(!data) {
      throw new BadRequestException(`User was not created!`);
    };
    
    return {
      message: `User created successfully`,
      data
    }

  }

  async findAll() {
      
    const data = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tasks: {
          select: {
            id: true,
            description: true
          },
          orderBy: {
            id: 'desc'
          }
        },
        createdAt: true
      }
    })

    return {
      message: `User List`,
      data
    }

  }

  async findOne(id: number) {
      
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if(!user) {
      throw new NotFoundException('User not Found!');
    }

    return {
      message: `User found successfully`,
      data: user
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {


    // validating if user exist
    await this.findOne(id);

    const userUpdated = await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto,
      select: {
        name: true,
        email: true,
        role: true,
      }
    });

    if(!userUpdated) {
      throw new BadRequestException(`User was not updated`);
    }

    return {
      message: 'User udpated successfully',
      data: userUpdated
    }

  }

  async remove(id: number) {
    
    // validatinf if user exist
    await this.findOne(id);

    const deleteUser = await this.prisma.user.delete({
      where: {
        id
      }
    });

    if(!deleteUser) {
      throw new BadRequestException(`User was not deleted`);
    }

    return {
      message: `User deleted successfully`
    }

  }
}
