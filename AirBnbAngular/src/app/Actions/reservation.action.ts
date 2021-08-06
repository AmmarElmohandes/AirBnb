import { createAction, props } from '@ngrx/store';
import { Property } from '../Models/property';
import { Search } from '../Models/search';

export const setReservation = createAction('[Reservation Component] setReservation ',props<{search:Search}>());
