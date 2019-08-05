import { Controller, Post, Req, Param, Delete, Body, Put, Get, UseGuards, HttpException } from '@nestjs/common'
import { Result } from '@app/common/interfaces/result.interface';
import { CreateTaskDto } from './dto/create.task.dto'
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service'
import { UpdateTaskDto } from './dto/update.task.dto'

@Controller('task')
export class TaskController {

  constructor(
    private readonly taskService: TaskService
  ) { }

  // 创建
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTask(@Req() req, @Body() body: CreateTaskDto): Promise<Result> {
    body.user = req.user
    await this.taskService.create(body)
    return { code: 0, message: '创建成功' }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number): Promise<Result> {
    const task = await this.taskService.findOneAndRelationById(id)
    if (!task) throw new HttpException('删除的帖子不存在', 404)
    if (task.user.id !== req.user.id) throw new HttpException('您不是该任务创建者，无法删除', 409)
    await this.taskService.remove(id)
    return { code: 0, message: '删除成功', data: true }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Req() req, @Param('id') id: number, @Body() updateInput: UpdateTaskDto): Promise<Result> {
    const task = await this.taskService.findOneAndRelationById(id)
    if (!task) throw new HttpException('删除的帖子不存在', 404)
    if (task.user.id !== req.user.id) throw new HttpException('您不是该任务创建者，无法修改', 409)
    await this.taskService.update(id, updateInput);
    return { code: 0, message: '修改成功', data: true }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req): Promise<Result> {
    const data = await this.taskService.findAll(req.user.id)
    return { code: 200, message: 'success', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const data = await this.taskService.findOneById(id)
    return { code: 200, message: 'success', data };
  }
}