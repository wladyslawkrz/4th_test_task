import { Place } from 'src/database/entities';

export const PlacesRepository = Symbol('PlacesRepository');

export const placesProviders = [{ provide: PlacesRepository, useValue: Place }];
