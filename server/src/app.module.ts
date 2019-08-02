import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/modules/user/user.module'
import { HelperModule } from '@app/modules/helper/helper.module';
import { ErrorsInterceptor } from '@app/common/interceptors/errors.interceptor'

@Module({
  imports: [TypeOrmModule.forRoot(), HelperModule, UserModul],
  // controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ErrorsInterceptor
  }],
})
export class AppModule { }
