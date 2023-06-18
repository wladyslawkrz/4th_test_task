import { Meetup, Place } from 'src/database/entities';

export const meetupsProviders = [
  { provide: 'MeetupsRepository', useValue: Meetup },
  { provide: 'PlacesRepository', useValue: Place },
];
