import { createAction, props } from '@ngrx/store';

export const setUserId = createAction('[Login Component] setUserId',props<{userId:number}>());