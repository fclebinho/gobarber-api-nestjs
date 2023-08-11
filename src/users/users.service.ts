import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { User } from '@prisma/client';

export abstract class IUsersService {
  abstract create(value: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User | null>;
  abstract update(id: string, value: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(private service: DatabaseService) {}

  async create(value: CreateUserDto): Promise<User> {
    const isAlready = await this.service.user.findFirst({
      where: { email: value.email },
    });

    if (isAlready) {
      throw new HttpException('This user is already', HttpStatus.BAD_REQUEST);
    }

    const user = await this.service.user.create({
      data: { name: value.name, email: value.email },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.service.user.findMany();

    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.service.user.findFirst({
      where: { id },
    });

    return user;
  }

  async update(id: string, value: UpdateUserDto): Promise<User> {
    const user = await this.service.user.update({
      where: { id },
      data: { name: value.name, email: value.email },
    });

    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.service.user.delete({
      where: { id },
    });

    return user;
  }
}
