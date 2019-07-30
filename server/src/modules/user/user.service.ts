import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CryptoUtil } from '@app/common/utils/crypto.util';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
  ) { }

  /**
   * 登录
   * @param  {string} username 
   * @param  {string} passwor 
   * @return Promise<void> 
   * @memberof UserService
   */
  async login(username: string, password: string): Promise<void> {
    const user = await this.findOneByUsername(username);
    if (!user) throw new HttpException('登录账号有误', 406);
    if (!this.cryptoUtil.checkPassword(password, user.password)) throw new HttpException('登录密码有误', 406)
  }

  /**
   * 通过登录账号查询用户
   * @param  {string} username 
   * @return Promise<User> 
   * @memberof UserService
   */
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepo.findOne({ username })
  }

}
