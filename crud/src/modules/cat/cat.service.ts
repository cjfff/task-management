import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Cat } from './cat.entity'


export class CatService {
  constructor(
    @InjectRepository(Cat) private readonly catRepo: Repository<Cat>, // 使用泛型注入对应类型的存储库实例
  ) { }

    async findAll() :Promise<Cat[]>{
      return this.catRepo.find()
    }

  /**
   * 创建
   * @param cat
   */
  async createCat(cat: Cat): Promise<Cat> {
    // 插入数据时，删除 id，避免请求体传入 id
    delete cat.id
    return this.catRepo.save(this.catRepo.create(cat))
  }

  /**
   * 删除
   * @param id ID
   */
  async deleteCat(id: number): Promise<void> {
    await this.findOneById(id);
    this.catRepo.delete(id);
  }

  /**
   * 更新
   * @param id
   * @param cat
   */
  async updateCat(id: number, cat: Cat): Promise<void> {
    const existCat = await this.findOneById(id);

    // 当传入空数据时，避免覆盖原数据
    existCat.nickname = cat && cat.nickname ? cat.nickname : existCat.nickname;
    existCat.species = cat && cat.species ? cat.species : existCat.species;
    this.catRepo.save(existCat);
  }


  /**
   * 根据ID查询
   * @param id
   */
  async findOneCat(id: number): Promise<Cat> {
    return this.findOneById(id)
  }

  /**
   * 根据ID查询单个信息，如果不存在则抛出 404 异常
   * @param id
   */
  private async findOneById(id: number): Promise<Cat> {
    const catInfo = await this.catRepo.findOne(id);

    if (!catInfo) {
      throw new HttpException(`指定 id=${id} 的猫没找到`, 404)
    }
    return catInfo
  }

}
