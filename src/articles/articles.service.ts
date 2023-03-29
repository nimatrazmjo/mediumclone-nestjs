import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async update(id: number, currentUserId: number,updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({id});
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not the author of this article', HttpStatus.UNAUTHORIZED);
    }

    article.title = updateArticleDto.title;
    article.description = updateArticleDto.description;
    article.body = updateArticleDto.body;
    return this.articleRepository.save(article);
  }

  async remove(slug: string, currentUserId: number): Promise<DeleteResult> {
    const article = await this.articleRepository.findOneBy({slug});
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not the author of this article', HttpStatus.UNAUTHORIZED);
    }
    return this.articleRepository.delete({id: article.id});
  }

  articleResponse(article: ArticleEntity): any {
    return { article }
  }
}
