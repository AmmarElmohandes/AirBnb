import { createAction, props } from '@ngrx/store';

export const setId = createAction('[Login Component] setId ',props<{hostId:number}>());
export const resetId = createAction('[Login Component] resetId',props<{hostId:number}>());