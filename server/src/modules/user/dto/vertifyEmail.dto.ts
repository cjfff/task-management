import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class VertifyEmailDto {

  @ApiModelProperty({ example: '2748816849@qq.com', description: '邮箱', required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ example: 'xxxx', description: '验证的token，由服务端派发', required: true })
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}