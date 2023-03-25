import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUserResponse } from '../types/userResponse.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/')
    findAll(): string {
        return this.userService.findAll();
    }

    @Post('/')
    async create( @Body('user') user: CreateUserDto ): Promise<IUserResponse> {
        const userResponse = await this.userService.create(user);
        return this.userService.formatUserResponse(userResponse);

    }
}