import { Controller, Put, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('reset-problems')
  async resetProblemsFlag(): Promise<{ updatedUsersCount: number }> {
    const updatedUsersCount =
      await this.userService.updateProblemsFlagToFalse();
    return { updatedUsersCount };
  }

  @Get('count-problems')
  async countUsersWithProblems(): Promise<{ count: number }> {
    const count = await this.userService.countUsersWithProblems();
    return { count };
  }
}
