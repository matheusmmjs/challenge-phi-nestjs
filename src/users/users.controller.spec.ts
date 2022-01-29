import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userList: User[] = [
  new User({
    email: 'teste@phi.com',
    name: 'Teste',
    password: '1234',
    cpf: '12344354346',
  }),
];

const newUser = new User({
  email: 'teste@phi.com',
  name: 'Teste',
  password: '1234',
  cpf: '12344354346',
});

const updatedUser = new User({
  email: 'teste@phi.com',
  name: 'Updated',
});

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUser),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            findAll: jest.fn().mockResolvedValue(userList),
            update: jest.fn().mockResolvedValue(updatedUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a user list entity successfully', async () => {
      //Act
      const result = await userController.findAll();

      //Assert
      expect(result).toBe(userList);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      //Arrange
      const body: CreateUserDto = {
        email: 'teste@phi.com',
        name: 'Teste',
        password: '1234',
        cpf: '12344354346',
      };

      //Act
      const result = await userController.create(body);

      //Assert
      expect(result).toBe(newUser);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      //Arrange
      const body: CreateUserDto = {
        email: 'teste@phi.com',
        name: 'Teste',
        password: '1234',
        cpf: '12344354346',
      };

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get a user item successfully', async () => {
      //Act
      const result = await userController.findOne('1');

      //Assert
      expect(result).toBe(userList[0]);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      //Arrange
      const body: UpdateUserDto = {
        email: 'teste@phi.com',
        name: 'Updated',
      };

      //Act
      const result = await userController.update('1', body);

      //Assert
      expect(result).toBe(updatedUser);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      //Arrange
      const body: UpdateUserDto = {
        email: 'teste@phi.com',
        name: 'Updated',
      };

      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a user item successfully', async () => {
      //Act
      const result = await userController.remove('1');

      //Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.remove('1')).rejects.toThrowError();
    });
  });
});
