import { Module } from '@nestjs/common';
import { IUsersService, UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { CreateUserDto } from './dto/create-user.dto';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
    CreateUserDto,
  ],
  exports: [IUsersService, CreateUserDto],
})
export class UsersModule {}
