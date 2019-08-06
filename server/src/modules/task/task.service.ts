import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create.task.dto'
import { UpdateTaskDto } from './dto/update.task.dto'


@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) { }


    /**
     * 创建 task
     * @param createInput 
     */
    async create(createInput: CreateTaskDto): Promise<void> {
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

    /**
     * 更新 task
     * @param  {number} id 
     * @param  {UpdateTaskDto} updateInput 
     * @return Promise<void> 
     * @memberof TaskService
     */
    async update(id: number, updateInput: UpdateTaskDto): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) throw new HttpException(`更新失败，ID 为 '${id}' 的帖子不存在`, 404);
        if (updateInput.title) existing.title = updateInput.title
        if (updateInput.content) existing.content = updateInput.content
        await this.taskRepo.save(existing)
    }


    /**
     * 根据id查找 task
     * @param id 
     */
    async findOneById(id) {
        return this.taskRepo.findOne(id)
    }


    async findOneAndRelationById(id) {
        return this.taskRepo.findOne(id, { relations: ["user"] })
    }

    /**
     * 查询用户的所有帖子
     * @param  {number} userId 
     * @return Promise<Task[]> 
     * @memberof TaskService
     */
    // : Promise<>
    async findAll(userId: number, options: any) {
        const pagesize = Number(options.pageSize) || 10;
        const page = Number(options.page) * pagesize || 0;
        const orderByCreateAt = options.currentSortOrder
            ? options.currentSortOrder.toUpperCase()
            : 'DESC';
        let params = {};
        let term = '';
        if (options.search) {
            (term =
                'task.title Like :title OR task.content Like :content AND task.userId Like :userId'),
                (params = {
                    title: `%${options.search}%`,
                    content: `%${options.search}%`,
                    userId: `%${userId}%`
                });
        }

        const [data, total = 0] = await this.taskRepo
            .createQueryBuilder('taskRepo')
            // .leftJoinAndSelect('taskRepo.user', 'user')
            // .leftJoinAndSelect('taskRepo.category', 'category')
            // .leftJoinAndSelect('taskRepo.tags', 'tags')
            .where(term, params)
            .orderBy({
                'createdAt': orderByCreateAt,
            })
            .offset(page)
            .limit(pagesize)
            .getManyAndCount();

        return { data, total, page: page + 1 };
        // return this.taskRepo.find({ where: { user: { id: userId } } })
    }
}