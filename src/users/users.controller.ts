import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IUserResponse } from '../types/userResponse.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/')
    findAll(): string {
        return this.userService.findAll();
    }

    @Post('/')
    @UsePipes(new ValidationPipe())
    async create( @Body('user') user: CreateUserDto ): Promise<IUserResponse> {
        const userResponse = await this.userService.create(user);
        return this.userService.formatUserResponse(userResponse);

    }

    @Post('/login')
    async login( @Body('user') user: LoginDTO ): Promise<IUserResponse> {
        const userResponse = await this.userService.login(user);
        return this.userService.formatUserResponse(userResponse);
    }
}