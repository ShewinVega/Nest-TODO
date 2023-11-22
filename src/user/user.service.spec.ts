import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userTest } from '../../__Mocks__/use.mock';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../config/singleton.config';


describe('UserService', () => {
  let service: UserService;

  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock                                                            
        }     
      ],
    }).compile();   

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`GET Users`, () => {

    it(`Should return all the user array`, async () => {

      prismaMock.user.findMany.mockResolvedValue(userTest)

      const users = await service.findAll();
      
      
      expect(users.data).toEqual(userTest);

    });

  });

  describe('POST: Create User', () => {

    it(`Should successfully create a user `, async () => {

      
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { id, ...restUser } = userTest[2];
      const mockUser = {
        ...userTest[2]
      }
      prismaMock.user.create.mockResolvedValue(mockUser);

      const userCreated = await service.create({
        ...restUser
      });

      expect(userCreated.data).toBe(mockUser);

    });

  });

  describe('PATH: Update User', () => {

    it(`Should successfully update user`, async () => {

      prismaMock.user.findUnique.mockResolvedValue(userTest[0]);
      prismaMock.user.update.mockResolvedValue(userTest[0]);

      const userUpdated = await service.update(1,userTest[0]);

      expect(userUpdated.data).toEqual(userTest[0]);


    });

  });

  describe('DELETE: remove User', () => {

    it(`Should successfully remove user`, async () => {

      prismaMock.user.findUnique.mockResolvedValue(userTest[1]);
      prismaMock.user.delete.mockResolvedValue(userTest[1]);

      const userRemoved = await service.remove(2);

      expect(userRemoved.message).toEqual(`User deleted successfully`);

    });

  });

});
