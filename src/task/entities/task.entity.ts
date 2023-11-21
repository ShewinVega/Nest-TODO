import { Task } from '@prisma/client';

export class TaskEntity implements Task {

  id: number;

  description: string;

  userId: number;

  createdAt: Date;

  updatedAt: Date;

}
