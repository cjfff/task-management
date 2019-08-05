import { Controller, Post, Req, Param, Delete, Body, Put, Get } from '@nestjs/common'
import { Result } from '@app/common/interfaces/result.interface';

@Controller('task')
export class TaskController {


  // 创建
  @Post()
  async createTask(@Req() req: Request, @Body() body): Promise<Result> {
    return { code: 0, message: '创建成功' }
  }


  @Delete()
  async remove(@Param() id: number): Promise<Result> {
    return { code: 0, message: '删除成功', data: true }
  }

  @Put() 
  async update(@Param() id: number, @Body() body): Promise<Result> {
    return { code: 0, message: '修改成功', data: true }
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Result> {
    return { code: 200, message: 'success', data: {} };
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<Result> {
    return { code: 200, message: 'success', data: {} };
  }
}