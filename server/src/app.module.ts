import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from '@app/modules/users/users.module'

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
