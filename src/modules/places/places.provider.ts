import { Place } from 'src/database/entities';

export const placesProviders = [
  { provide: 'PlacesRepository', useValue: Place },
];
