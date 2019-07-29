import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  nickname: string;

  @Column({ length: 255 })
  password: string

  @Column('tinyint')
  verifyEmail: number

  @Column({ length: 255 })
  email: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date
}
