import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
