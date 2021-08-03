import { createAction, props } from '@ngrx/store';

export const setId = createAction('[Login Component] setId ',props<{hostId:number}>());
