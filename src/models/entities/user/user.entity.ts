import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { createHashPasswordWithSalt } from '../../../helpers/authentication.helper';

const scrypt = promisify(_script);

@Entity({ name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: '' })
    bio: string;

    @Column({default: ''})
    image: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await createHashPasswordWithSalt(this.password);
    }
}