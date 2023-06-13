import { Meetup, Place } from 'src/entities';

export const meetupsProviders = [
  { provide: 'MeetupsRepository', useValue: Meetup },
  { provide: 'PlacesRepository', useValue: Place },
];
