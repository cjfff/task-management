import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { User } from '../user/user.entity'

export enum taskStatus {
  IN_COMPLATE = 0,
  COMPLATE = 1,
  DELETED = 2,
}
@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @Column({ length: 255 })
  title: string;

  // 内容
  @Column({
    type: 'text'
  })
  content: string;
  /**
   * 
   * @type number 0 未完成，1 完成, 2 已删除'  默认未完成
   * @memberof Task
   */
  @Column({
    type: 'enum',
    enum: taskStatus,
    default: taskStatus.IN_COMPLATE
  })
  status: number;

  @Column({ type: 'timestamp', nullable: true })
  complateTime: Date;

  @UpdateDateColumn()
  updatedAt: number;

  @CreateDateColumn()
  createdAt: number;

  // 在 @ManyToOne 一侧，即在外键拥有者一侧，设置 onDelete，就可以使用外键的级联功能，这里设置级联删除，当删除 user 时，user 的所有 task 会被级联删除
  @ManyToOne(type => User, user => user.tasks, {
    onDelete: 'CASCADE'
  })
  user: User;
}
