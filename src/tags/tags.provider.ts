import { Tag } from 'src/entities';

export const tagsProviders = [{ provide: 'TagsRepository', useValue: Tag }];
