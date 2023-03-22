import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ORMConfig from './configs/orm.config';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ TypeOrmModule.forRoot(ORMConfig), TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
