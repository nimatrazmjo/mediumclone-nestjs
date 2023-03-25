import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import JwtHelper from '../helpers/jwt.helper';
import { UserEntity } from '../models/entities/user/user.entity';
import { IUserResponse } from '../types/userResponse.interface';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    findAll(): string {
        return 'This action returns all users';
    }

    async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
        const userByEMail = this.userRepository.findOneBy({email: createUserDTO.email});
        const userByUsername = this.userRepository.findOneBy({username: createUserDTO.username});

        if (userByEMail || userByUsername) {
            throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const user = this.userRepository.create(createUserDTO);
        return this.userRepository.save(user);
    }

    async formatUserResponse(userEntity: UserEntity): Promise<IUserResponse> {
        const {id, email, username} = userEntity;
        return {
            user: {
                ...userEntity,
                token: await JwtHelper.generateToken({id, email, username}),
            }
        }
    }
}
