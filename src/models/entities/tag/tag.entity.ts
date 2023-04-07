import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../../../articles/entities/article.entity';

@Entity({ name: 'tags' })
export class TagEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
