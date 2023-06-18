import { Tag } from 'src/database/entities';

export const TagsRepository = Symbol('TagsRepository');

export const tagsProviders = [{ provide: TagsRepository, useValue: Tag }];
