import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ORMConfig from './config/orm.config';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ TypeOrmModule.forRoot(ORMConfig), TagsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
