import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @ApiModelProperty({ example: 'cjf', description: '用户名', required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiModelProperty({ example: '123', description: '密码', required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}