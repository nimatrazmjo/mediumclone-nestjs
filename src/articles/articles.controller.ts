import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from '../models/entities/user/user.entity';
import { User } from '../users/decorators/user.decorator';
import { AuthGuard } from '../users/guards/auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IArticleResponse } from './types/article-response.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body('article') createArticleDto: CreateArticleDto, @User() user: UserEntity): Promise<IArticleResponse> {
    const article = await this.articlesService.create(createArticleDto, user);
    return this.articlesService.articleResponse(article);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<IArticleResponse> {
    const article = await this.articlesService.findOne(slug);
    return this.articlesService.articleResponse(article);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string,  @User('id') currentUserId: number,@Body('article') updateArticleDto: UpdateArticleDto): Promise<IArticleResponse> {
    const article =  await this.articlesService.update(+id, currentUserId,updateArticleDto);
    return this.articlesService.articleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  remove(@Param('slug') slug: string, @User('id') currentUserId: number) {
    return this.articlesService.remove(slug, currentUserId);
  }
}
