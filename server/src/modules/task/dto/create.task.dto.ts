import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../user/user.entity'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;


  user?: User;
}