import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { TagEntity } from '../models/entities/tag.entity/tag.entity';

@Injectable()
export class TagsService {
    constructor (@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>) {}

    async findAll(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }
}
