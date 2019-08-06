import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { User } from '../../user/user.entity'
import { taskStatus } from '../task.entity'
import { ApiModelProperty } from '@nestjs/swagger';


export class CreateTaskDto {

  @ApiModelProperty({ example: '标题', description: '标题', required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;


  @ApiModelProperty({ example: '内容', description: '内容', required: true })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  user?: User;

  @IsEnum(taskStatus)
  readonly status?: number;
}