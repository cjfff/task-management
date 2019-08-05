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

  @ManyToOne(type => User, user => user.tasks)
  user: User;
}
