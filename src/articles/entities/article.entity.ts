import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {

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


}
