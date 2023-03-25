import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

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

        // Generate a random salt
        const salt = randomBytes(8).toString('hex');

        // Hash the password with the salt
        const buf = (await scrypt(this.password, salt, 64)) as Buffer;

        // Store the hashed password and salt in the database
        this.password = `${buf.toString('hex')}.${salt}`;
    }
}