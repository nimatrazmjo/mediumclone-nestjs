import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from '../models/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
