import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from '../models/entities/user/user.entity';
import { ExpressRequest } from '../types/expressRequest.interface';
import { IUserResponse } from '../types/userResponse.interface';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/')
    @UseGuards(AuthGuard)
    async findCurrentUser(@User() user: UserEntity | null): Promise<IUserResponse> {
        if (!user) {
            return null;
        }
        return await this.userService.formatUserResponse(user);
    }

    @Post('/')
    @UsePipes(new ValidationPipe())
    async create( @Body('user') user: CreateUserDto ): Promise<IUserResponse> {
        const userResponse = await this.userService.create(user);
        return this.userService.formatUserResponse(userResponse);

    }

    @Put('/')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async update( @User() user: UserEntity | null, @Body('user') userUpdate: UpdateUserDTO ): Promise<IUserResponse> {
        if (!user) {
            return null;
        }
        const userResponse = await this.userService.update(user, userUpdate);
        return this.userService.formatUserResponse(userResponse);
    }

    @Post('/login')
    async login( @Body('user') user: LoginDTO ): Promise<IUserResponse> {
        const userResponse = await this.userService.login(user);
        return this.userService.formatUserResponse(userResponse);
    }
}