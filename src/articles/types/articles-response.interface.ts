import { ArticleEntity } from '../entities/article.entity';

export interface ArticlesResponse {
    articles: ArticleEntity[];
    articlesCount: number;
}