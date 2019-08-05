import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { Task } from '../task/task.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, comment: '用户名' })
  username: string;

  @Column({ length: 255, comment: '昵称', nullable: true })
  nickname: string;

  @Column({ length: 5, comment: '角色', default: '' })
  role: string;

  @Column({ length: 255, comment: '密码' })
  password: string

  @Column({ length: 255, comment: '邮箱' })
  email: string;

  @Column({ type: 'tinyint', comment: '是否验证邮箱 0 未验证，1 已验证', default: 0 })
  verifyEmail: number

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];
}
