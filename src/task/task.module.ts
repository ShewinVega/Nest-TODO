import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    AuthModule,
    UserModule,
    PrismaModule
  ]
})
export class TaskModule {}
