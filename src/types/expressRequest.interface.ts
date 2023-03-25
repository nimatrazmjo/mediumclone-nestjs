import { Request } from 'express';
import { UserEntity } from '../models/entities/user/user.entity';

export interface ExpressRequest extends Request {
    user?: UserEntity;
}