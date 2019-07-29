import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './modules/cat/cat.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorsInterceptor } from './common/errors.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(), CatModule], // 导入其他模块的集合
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ErrorsInterceptor
  },
    AppService],
  exports: []
})
export class AppModule { }
