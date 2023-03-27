import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ORMConfig from './config/orm.config';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ TypeOrmModule.forRoot(ORMConfig), TagsModule, UsersModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
