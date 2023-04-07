import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { createHashPasswordWithSalt } from '../../../helpers/authentication.helper';
import { ArticleEntity } from '../../../articles/entities/article.entity';

const scrypt = promisify(_script);

@Entity({ name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({ select: false})
    password: string;

    @Column({ default: '' })
    bio: string;

    @Column({default: ''})
    image: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await createHashPasswordWithSalt(this.password);
    }

    @OneToMany(type => ArticleEntity, articles => articles.author)
    articles: ArticleEntity[];

    @ManyToMany(() => ArticleEntity)
    @JoinTable()
    favorites: ArticleEntity[];
}