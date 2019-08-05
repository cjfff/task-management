import { IsEnum } from 'class-validator';
import { taskStatus } from '../task.entity'

export class UpdateTaskDto {
  readonly title: string;

  readonly content: string;

  @IsEnum(taskStatus)
  readonly status: number;
}