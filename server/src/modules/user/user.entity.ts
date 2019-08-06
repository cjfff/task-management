import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from '@nestjs/swagger';

import { Task } from '../task/task.entity'

@Entity()
export class User {
  @ApiModelProperty({ example: 1, description: '用户id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ example: 'admin', description: '用户名' })
  @Column({ length: 255, comment: '用户名' })
  username: string;

  @ApiModelProperty({ example: 'user', description: '昵称' })
  @Column({ length: 255, comment: '昵称', nullable: true })
  nickname: string;

  @ApiModelProperty({ example: 'admin', description: '角色，默认为空' })
  @Column({ length: 5, comment: '角色', default: '' })
  role: string;

  @Column({ length: 255, comment: '密码' })
  password: string

  @ApiModelProperty({ example: 'xxx@qq.com', description: '用户邮箱' })
  @Column({ length: 255, comment: '邮箱' })
  email: string;

  @ApiModelProperty({ example: '0', description: '邮箱是否认证' })
  @Column({ type: 'tinyint', comment: '是否验证邮箱 0 未验证，1 已验证', default: 0 })
  verifyEmail: number

  @ApiModelProperty({ example: '2019-08-04 18:48:49.199352', description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: string;

  @ApiModelProperty({ example: '2019-08-04 18:48:49.199352', description: '创建时间' })
  @CreateDateColumn()
  createdAt: string;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];
}
