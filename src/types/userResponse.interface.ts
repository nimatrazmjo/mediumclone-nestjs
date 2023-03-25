import { UserEntity } from '../models/entities/user/user.entity';

export interface IUserResponse {
    user: Omit<UserEntity,'hashPassword'> & { token: string }
}