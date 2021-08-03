import { createAction, props } from '@ngrx/store';

export const setPropertyId = createAction('[Property Component] setPropertyId ',props<{propertyId:number}>());
export const resetId = createAction('[Property Component] resetId');