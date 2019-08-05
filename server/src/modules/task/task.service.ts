import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity'
import { exists } from 'fs';


@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) { }


    /**
     * 创建 task
     * @param createInput 
     */
    async create(createInput: Task): Promise<void> {
        await this.taskRepo.save(createInput);
    }

    /**
     * 删除帖子
     * @param id 
     */
    async remove(id: number): Promise<void> {
        const existing = await this.findOneById(id)
        if (!existing) throw new HttpException(`删除失败，ID 为 ${id} 的 任务不存在`, 404)
        await this.taskRepo.remove(existing)
    }

    async update(id: number, updateInput: Task): Promise<void> {
        
    }


    /**
     * 根据id查找 task
     * @param id 
     */
    async findOneById(id) {
        return this.taskRepo.findOne(id)
    }
}