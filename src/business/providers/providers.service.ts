import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { FindProviderDto } from './dto/find-provider.dto';
// import { CreateProviderDto } from './dto/create-provider.dto';
// import { UpdateProviderDto } from './dto/update-provider.dto';

export abstract class IProvidersService {
  abstract findAll(findProviderDto: FindProviderDto);
  abstract findOne(findProviderDto: FindProviderDto);
}

@Injectable()
export class ProvidersService implements IProvidersService {
  constructor(private db: DatabaseService) {}

  // create(createProviderDto: CreateProviderDto) {
  //   return 'This action adds a new provider';
  // }

  async findAll({ userLoggedSub }: FindProviderDto) {
    const response = await this.db.user.findMany({
      where: { NOT: { sub: userLoggedSub }, role: 'PROVIDER' },
    });

    return response;
  }

  async findOne({ userLoggedSub, id }: FindProviderDto) {
    const response = await this.db.user.findUnique({
      where: { NOT: { sub: userLoggedSub }, id, role: 'PROVIDER' },
    });

    return response;
  }

  // update(id: number, updateProviderDto: UpdateProviderDto) {
  //   return `This action updates a #${id} provider`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} provider`;
  // }
}
