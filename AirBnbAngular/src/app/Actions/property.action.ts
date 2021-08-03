import { createAction, props } from '@ngrx/store';
import { Property } from '../Models/property';

export const setProperty = createAction('[Reservation Component] setProperty ',props<{property:Property}>());
