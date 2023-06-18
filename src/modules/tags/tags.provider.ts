import { Tag } from 'src/database/entities';

export const tagsProviders = [{ provide: 'TagsRepository', useValue: Tag }];
