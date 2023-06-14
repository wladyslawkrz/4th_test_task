import { Place } from 'src/entities';

export const placesProviders = [
  { provide: 'PlacesRepository', useValue: Place },
];
