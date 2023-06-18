import { Meetup, Place } from 'src/database/entities';

export const MeetupsRepository = Symbol('MeetupsRepository');
export const PlacesRepository = Symbol('PlacesRepository');

export const meetupsProviders = [
  { provide: MeetupsRepository, useValue: Meetup },
  { provide: PlacesRepository, useValue: Place },
];
