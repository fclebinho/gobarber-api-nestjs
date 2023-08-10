import { Controller, Post, Logger, Body } from '@nestjs/common';
import { CreateMemberBody } from './dtos/create-member-body';
import { MemberRepository } from './repositories/member-repository';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private repository: MemberRepository) {}

  @Post()
  async getHello(@Body() body: CreateMemberBody) {
    const { name } = body;
    await this.repository.create(name);
  }
}
