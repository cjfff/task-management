import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService } from './auth.service'

export class AuthStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey'
    })
  }

/**
  * validate 方法实现了父类的抽象方法，在解密授权令牌成功后，即本次请求的授权令牌是没有过期的，
  * 此时会将解密后的 payload 作为参数传递给 validate 方法，这个方法需要做具体的授权逻辑，比如这里我使用了通过用户名查找用户是否存在。
  * 当用户不存在时，说明令牌有误，可能是被伪造了，此时需抛出 UnauthorizedException 未授权异常。
  * 当用户存在时，会将 user 对象添加到 req 中，在之后的 req 对象中，可以使用 req.user 获取当前登录用户。
  */
  async validate(payload: { account: string}) {
    const user = await this.authService.validate(payload);
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
