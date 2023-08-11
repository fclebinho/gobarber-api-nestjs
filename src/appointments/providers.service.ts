import { Injectable } from '@nestjs/common';
import { UserProvider } from '@prisma/client';
import { DatabaseService } from 'src/common/database/database.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { IUsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export abstract class IProvidersService {
  abstract create(value: CreateProviderDto): Promise<UserProvider>;
  abstract findAll(exceptUserLogged?: string): Promise<UserProvider[]>;
}

@Injectable()
export class ProvidersService implements IProvidersService {
  constructor(
    private service: DatabaseService,
    private userService: IUsersService,
  ) {}
  async create(value: CreateProviderDto): Promise<UserProvider> {
    const user = await this.userService.create(value as CreateUserDto);

    const appointment = await this.service.userProvider.create({
      data: { userId: user.id },
    });

    return appointment;
  }

  async findAll(exceptUserLogged?: string): Promise<UserProvider[]> {
    const providers = await this.service.userProvider.findMany({
      include: { user: true },
      where: { id: { not: exceptUserLogged } },
    });

    return providers;
  }
}
