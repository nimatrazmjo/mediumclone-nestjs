import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entities/user/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    findAll(): string {
        return 'This action returns all users';
    }

    async create(createUserDTO: CreateUserDto): Promise<CreateUserDto> {
        const user = this.userRepository.create(createUserDTO);
        return this.userRepository.save(user);
    }
}
