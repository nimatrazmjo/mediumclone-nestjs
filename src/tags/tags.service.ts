import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    findAll(): string[] {
        return ['tag1', 'tag2'];
    }
}
