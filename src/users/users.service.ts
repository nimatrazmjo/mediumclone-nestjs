import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePassword } from '../helpers/authentication.helper';
import JwtHelper from '../helpers/jwt.helper';
import { UserEntity } from '../models/entities/user/user.entity';
import { IUserResponse } from '../types/userResponse.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    findAll(): string {
        return 'This action returns all users';
    }

    async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
        const userByEMail = await this.userRepository.findOneBy({email: createUserDTO.email});
        const userByUsername = await this.userRepository.findOneBy({username: createUserDTO.username});

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

    async login(loginDTO: LoginDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where:{email: loginDTO.email}, select: ['id', 'email', 'username', 'password', 'bio', 'image']});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isPasswordValid = await comparePassword(user.password, loginDTO.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return user;
    }

    async findUserById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return user;
    }

    async update(userEntity: UserEntity, {email, bio, image}: UpdateUserDTO): Promise<UserEntity> {
        userEntity.email = email ?? userEntity.email;
        userEntity.bio = bio ?? userEntity.bio;
        userEntity.image = image ?? userEntity.image;

        const user = await this.userRepository.save(userEntity);
        return user;
    }
}
