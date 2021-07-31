import { Action, createReducer, on, State } from '@ngrx/store';
import { setPropertyId, resetId } from 'src/app/Actions/property.action'


// export interface State{
    
// }
export const initialState = 0;

const _propertyReducer = createReducer(
  initialState,
  on(setPropertyId, (state,{propertyId}) =>state=propertyId),
  on(resetId, (state) => 0)
);

export function PropertyReducer(state:any, action:any) {
  return _propertyReducer(state, action);
}
