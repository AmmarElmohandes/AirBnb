import { Action, createReducer, on, State } from '@ngrx/store';
import { setPropertyId, resetId } from 'src/app/Actions/propertyId.action'


// export interface State{
    
// }
export const initialState = 0;

const _propertyIdReducer = createReducer(
  initialState,
  on(setPropertyId, (state,{propertyId}) =>state=propertyId),
  on(resetId, (state) => 0)
);

export function PropertyIdReducer(state:any, action:any) {
  return _propertyIdReducer(state, action);
}
