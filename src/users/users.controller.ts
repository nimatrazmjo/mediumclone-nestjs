import { Body, Controller, Get, Post } from '@nestjs/common';
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
    create( @Body('user') user: CreateUserDto ): Promise<CreateUserDto> {
        return this.userService.create(user);
    }
}