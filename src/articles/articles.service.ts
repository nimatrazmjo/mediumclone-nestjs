import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../models/entities/user/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { IQueryable } from './types/query.interface';
import { ArticlesResponse } from './types/articles-response.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}
  create(createArticleDto: CreateArticleDto, user: UserEntity): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    article.title = createArticleDto.title;
    article.description = createArticleDto.description;
    article.body = createArticleDto.body;
    article.author = user;

    return this.articleRepository.save(article);
  }

  async favorite(slug: string, currentUserId: number): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({slug});
    const user = await this.userRepository.findOne({where: {id: currentUserId}, relations: ['favorites']});
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (user.favorites.find(favorite => favorite.id === article.id)) {
      throw new HttpException('Article already favorited', HttpStatus.BAD_REQUEST);
    }

    user.favorites.push(article);
    article.favoritesCount++;
    await this.userRepository.save(user);
    await this.articleRepository.save(article);
    return article;
  }

  async unfavorite(slug: string, currentUserId: number): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({slug});
    const user = await this.userRepository.findOne({where: {id: currentUserId}, relations: ['favorites']});
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (!user.favorites.find(favorite => favorite.id === article.id)) {
      throw new HttpException('Article already unfavorited', HttpStatus.BAD_REQUEST);
    }
    user.favorites = user.favorites.filter(favorite => favorite.id !== article.id);
    article.favoritesCount--;
    await this.userRepository.save(user);
    await this.articleRepository.save(article);
    return article;
  }

  async findAll(userId: number, query: IQueryable): Promise<ArticlesResponse> {
    const { limit, offset, tag, author, favorited } = query;
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.author', 'author');
    // qb.leftJoinAndSelect('article.tags', 'tag');

    if (author) {
      qb.andWhere('author.username = :author', { author });
    }

    // if (tag) {
    //   qb.andWhere('tag.tagList LIKE :tag', { tag: `%${tag}%` });
    // }

    qb.orderBy('article.createdAt', 'DESC');
    qb.limit(limit);
    qb.offset(offset);

    const records = await qb.getMany();
    const count = await qb.getCount();

    return this.articlesResponse(records, count);
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

  articlesResponse(articles:ArticleEntity[], articlesCount: number): ArticlesResponse  {
    return { articles, articlesCount };
  }
}
