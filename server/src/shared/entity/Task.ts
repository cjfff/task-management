import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Task {

  @PrimaryColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column({length: 255})
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

  @Column('date')
  createdTime: Date;

  @Column('date')
  updatedTime: Date;
}
