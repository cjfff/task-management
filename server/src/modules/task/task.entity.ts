import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { User } from '../user/user.entity'

@Entity()
export class Task {

  @PrimaryColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column({ length: 255 })
  name: string;

  /**
   * 
   * @type number 0 未完成，1 完成, 2 已删除',
   * @memberof Task
   */
  @Column('tinyint')
  status: number;

  @Column('date')
  complateTime: Date;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  // 在 @ManyToOne 一侧，即在外键拥有者一侧，设置 onDelete，就可以使用外键的级联功能，这里设置级联删除，当删除 user 时，user 的所有 task 会被级联删除
  @ManyToOne(type => User, user => user.tasks, {
    onDelete: 'CASCADE'

  })
  user: User;
}
