import { $Enums, User } from '@prisma/client';
import { TaskEntity } from '@task/entities/task.entity';

export class UserEntity implements User {

  id: number;

  name: string;

  email: string;

  password: string;

  role: $Enums.Role;

  tasks?: TaskEntity[];

  createdAt: Date;

  updatedAt: Date;

}
