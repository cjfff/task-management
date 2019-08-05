import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'
import { AuthModule } from '../auth/auth.module'
import { CommonModule } from '@app/common/common.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // 处理模块间的循环依赖
    CommonModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
