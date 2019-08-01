/**
 * user controller.
 *
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { Result } from '@app/common/interfaces/result.interface';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() body: { username: string, password: string }): Promise<Result> {
    await this.userService.login(body.username, body.password);
    return { code: 0, message: '登录成功' }
  }

  @Post()
  async register(@Body() user: User): Promise<Result> {
    await this.userService.register(user)
    return { code: 0, message: '注册成功' }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const user = await this.userService.findOneById(id)
    delete user.password
    return { code: 0, message: '查询用户成功', data: user }
  }


  async remove(@Param() id: number): Promise<Result> {
    return { code: 0, message: '删除用户成功' }
  }

  @Get()
  async findAll(): Promise<Result> {
    return { code: 0, message: '查询所有用户成功', data: [] }
  }
}
