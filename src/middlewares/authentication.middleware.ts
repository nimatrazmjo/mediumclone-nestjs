import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import JwtHelper from '../helpers/jwt.helper';
import { ExpressRequest } from '../types/expressRequest.interface';
import { IPayload } from '../types/payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

    constructor(private readonly usersService: UsersService) {}

    async use(req: ExpressRequest, _: Response, next: Function) {
        if (!req.headers['authorization']) {
            req.user = null;
            next();
            return;
        }
        console.log(req.headers['authorization'],'authorizaation');
        const token = req.headers['authorization'].split(' ')[1];

        try {
            const decoded = JwtHelper.verifyToken(token);
            const user = await this.usersService.findUserById(decoded.id);
            req.user = user;
        }
        catch (err) {
            console.log(err, 'err');

            req.user = null;
        }
        next();

    }
}