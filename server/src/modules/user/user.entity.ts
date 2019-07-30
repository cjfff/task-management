import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, comment: '用户名' })
  username: string;

  @Column({ length: 255, comment: '昵称' })
  nickname: string;

  @Column({ length: 255, comment: '密码' })
  password: string

  @Column({ type: 'tinyint', comment: '是否验证邮箱 0 未验证，1 已验证' })
  verifyEmail: number

  @Column({ length: 255, comment: '邮箱' })
  email: string;

  @Column({ type: 'date', comment: '创建时间' })
  createdAt: Date;

  @Column({ type: 'date', comment: '结束时间' })
  updatedAt: Date
}
