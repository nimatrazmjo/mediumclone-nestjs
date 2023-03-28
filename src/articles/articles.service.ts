import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../models/entities/user/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>
  ) {}
  create(createArticleDto: CreateArticleDto, user: UserEntity): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    article.title = createArticleDto.title;
    article.description = createArticleDto.description;
    article.body = createArticleDto.body;
    article.author = user;

    return this.articleRepository.save(article);
  }

  findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }

  findOne(slug): Promise<ArticleEntity> {
    return this.articleRepository.findOneBy({slug});
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<any> {
    return this.articleRepository.update({id}, updateArticleDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.articleRepository.delete({id});
  }

  articleResponse(article: ArticleEntity): any {
    return { article }
  }
}
