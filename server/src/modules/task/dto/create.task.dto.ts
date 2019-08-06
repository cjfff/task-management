import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { User } from '../../user/user.entity'
import { taskStatus } from '../task.entity'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;


  user?: User;

  @IsEnum(taskStatus)
  readonly status?: number;
}