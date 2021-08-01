import { createAction, props } from '@ngrx/store';

export const sethostOruser = createAction('[Login Component] sethostOruser',props<{hostOruser:number}>());
export const resetId = createAction('[Login Component] resetId');