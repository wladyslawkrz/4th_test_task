import { Meetup } from 'src/entities';

export const meetupsProviders = [
  { provide: 'MeetupsRepository', useValue: Meetup },
];
