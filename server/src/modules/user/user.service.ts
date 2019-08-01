import { Injectable, HttpException, Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CryptoUtil } from '@app/common/utils/crypto.util';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit {

  async onModuleInit() {
    if (await this.findOneByUsername('admin')) return;
    // 初始化系统管理员
    const admin = this.userRepo.create({
      username: 'admin',
      password: this.cryptoUtil.encryptPassword('i_am_admin_!'),
      nickname: '系统管理员',
      role: 'admin',
      verifyEmail: 1,
      email: '865553742@qq.com'
    });
    await this.userRepo.save(admin);
  }


  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
  ) {
  }

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


  async register(user: User): Promise<void> {
    const existing = await this.findOneByUsername(user.username);
    if (existing) throw new HttpException('账号已存在', 409)
    user.password = this.cryptoUtil.encryptPassword(user.password);
    await this.userRepo.save(this.userRepo.create(user))
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


  async findOneById(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

}
