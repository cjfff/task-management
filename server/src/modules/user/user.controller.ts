/**
 * user controller.
 *
 */
import { Controller, Get, Post, Body, Param, HttpException, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { Result } from '@app/common/interfaces/result.interface';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto'
import { VertifyEmailDto } from './dto/vertifyEmail.dto'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../helper/helper.service.email'
import { geneateVerifyCode } from '@app/common/utils/index'
import { getStore, Store } from '@app/common/constants/store'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
  private readonly $emailStore: Store = getStore()

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailServer: EmailService,
  ) { }

  /**
  * 用户登录成功后，返回的 data 是授权令牌；
  * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
  * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
  */
  @ApiOperation({ title: '登录' })
  @ApiResponse({
    status: 201,
    description: '登录成功',
    type: LoginDto,
  })
  @ApiResponse({ status: 400, description: '用户名或者密码错误' })
  @Post('login')
  async login(@Body() body: LoginDto): Promise<Result> {
    const userData = await this.userService.login(body.username, body.password);
    const accessToken = await this.authService.createToken(userData)
    return {
      code: 0, message: '登录成功', payload: {
        ...userData,
        accessToken
      }
    }
  }


  @ApiOperation({ title: '创建用户' })
  @ApiResponse({
    status: 201,
    description: '创建用户成功',
    type: User,
  })
  @ApiResponse({ status: 409, description: '用户名已存在' })
  @Post()
  async register(@Body() user: User): Promise<Result> {
    await this.userService.register(user)
    return { code: 0, message: '注册成功' }
  }

  @ApiOperation({ title: '创建用户' })
  @ApiResponse({
    status: 201,
    description: '发送邮箱成功'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('sendEmailToVertify')
  async sendVertifyEmail(@Request() req): Promise<Result> {
    const user: User = req.user;
    const accessToken = geneateVerifyCode(20) // 生成 token
    this.$emailStore.set(user.email, accessToken)
    await this.emailServer.sendMail({
      to: user.email,
      subject: '【任务管理系统邮箱验证】',
      text: '验证邮箱, 链接一小时内有效',
      html: `请点击链接验证邮箱, 链接一小时内有效 <a href="http://localhost:8080/#feedback?email=${user.email}&token=${accessToken}&type=vertifyEmail">链接</a>`
    })
    return { code: 0, message: '发送邮箱成功' }
  }

  @ApiOperation({ title: '验证邮箱' })
  @ApiResponse({
    status: 201,
    description: '验证邮箱成功'
  })
  @ApiResponse({ status: 406, description: '验证token已失效，请重新发送.' })
  @ApiResponse({ status: 407, description: '邮箱已经认证，请勿重新认证' })
  @Post('vertifyEmail')
  async vertifyEmail(@Body() data: VertifyEmailDto): Promise<Result> {
    const token = this.$emailStore.get(data.email)
    if (!token) {
      throw new HttpException('验证token已失效，请重新发送', 406)
    }

    const user = await this.userService.findUserByEmail(data.email)

    if (user.verifyEmail === 1) {
      throw new HttpException('邮箱已经认证，请勿重新认证', 407)
    }

    await this.userService.vertifyEmail(user)

    return { code: 0, message: '邮箱认证成功' }
  }

  async remove(@Param() id: number): Promise<Result> {
    return { code: 0, message: '删除用户成功' }
  }

  @Get()
  async findAll(): Promise<Result> {
    return { code: 0, message: '查询所有用户成功', payload: [] }
  }

  @ApiOperation({ title: '获取用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取用户信息成功',
    type: User
  })
  @ApiResponse({ status: 403, description: '未授权' })
  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async getMe(@Request() req): Promise<Result> {
    return { code: 0, message: 'success', payload: req.user }
  }



  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new HttpException('没有找到该用户', 404)
    }

    user && delete user.password
    return { code: 0, message: '查询用户成功', payload: user }

  }
}
