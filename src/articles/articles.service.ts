import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>
  ) {}
  create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }

  findOne(id: number): Promise<ArticleEntity> {
    return this.articleRepository.findOneBy({id});
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<any> {
    return this.articleRepository.update({id}, updateArticleDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.articleRepository.delete({id});
  }
}
