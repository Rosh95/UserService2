import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateProblemsFlagToFalse(): Promise<number> {
    const usersToUpdate = await this.prisma.user.findMany({
      where: { hasProblems: true },
    });
    await this.prisma.user.updateMany({
      where: { hasProblems: true },
      data: { hasProblems: false },
    });
    return usersToUpdate.length;
  }

  async countUsersWithProblems(): Promise<number> {
    return this.prisma.user.count({ where: { hasProblems: true } });
  }
}
