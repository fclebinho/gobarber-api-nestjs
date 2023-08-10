import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MemberRepository } from 'src/repositories/member-repository';

@Injectable()
export class MemberRepositoryPrisma implements MemberRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<void> {
    await this.prisma.member.create({ data: { name } });
  }
}
