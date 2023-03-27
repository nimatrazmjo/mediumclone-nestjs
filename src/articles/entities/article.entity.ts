import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../../models/entities/user/user.entity';

@Entity({name: 'articles'})
export class ArticleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    slug: string;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column({type: 'simple-array', default: []})
    tagList: string[];

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;

    @Column()
    @IsNotEmpty()
    favoritesCount: number;

    @ManyToOne(type => UserEntity, user => user.articles, { eager: true, onDelete: 'CASCADE', cascade: true })
    author: UserEntity;


}