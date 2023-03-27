import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>
  ) {}
  create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: number): Promise<Article> {
    return this.articleRepository.findOneBy({id});
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<any> {
    return this.articleRepository.update({id}, updateArticleDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.articleRepository.delete({id});
  }
}
