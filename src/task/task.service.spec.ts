import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../config/singleton.config';
import { taskMock } from '../../__Mocks__/task.mock';
import { userTest } from '../../__Mocks__/use.mock';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService, 
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get tasks', () => {

    it(`Get al tasks`, async () => {

      prismaMock.task.findMany.mockResolvedValue(taskMock);

      const taskResponse = await service.findAll(userTest[0]);

      expect(taskResponse.data).toEqual(taskMock);
    });

    it(`Get user by ID`, async () => {

      prismaMock.task.findUnique.mockResolvedValue(taskMock[1]);

      const taskResponse = await service.findOne(taskMock[1].id);

      expect(taskResponse.data).toEqual(taskMock[1]);
    });
  });

  describe('Post task', () => {

    it(`Post: Should create a new task`, async () => {

      taskMock[2].id = userTest[0].id;
      prismaMock.task.create.mockResolvedValue(taskMock[2]);

      const taskResponse = await service.create({
        description: "Mock Description",
      }, userTest[0]);

      expect(taskResponse.data).toBe(taskMock[2]);
      expect(taskResponse.data.id).toEqual(userTest[0].id);

    });
  });

  describe(`PATH task`, () => {

    it(`Patch: Should update the task`, async () => {

      prismaMock.task.findUnique.mockResolvedValue(taskMock[1]);
      taskMock[1].description = 'Description task udpated';
      prismaMock.task.update.mockResolvedValue(taskMock[1]);

      const taskResponse = await service.update(taskMock[1].id,taskMock[1]);

      expect(taskResponse.data.description).toEqual('Description task udpated');

    });
  });

  describe(`DELETE task`, () => {

    it(`Delete: Should delete the task`, async () => {

      prismaMock.task.findUnique.mockResolvedValue(taskMock[0]);
      prismaMock.task.delete.mockResolvedValue(taskMock[0]);

      const taskResponse = await service.remove(taskMock[0].id);

      expect(taskResponse.message).toEqual(`Task deleted successfully`);

    });

  });


});
