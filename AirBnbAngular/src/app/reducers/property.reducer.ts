import { Action, createReducer, on, State } from '@ngrx/store';
import { setPropertyId, resetId } from 'src/app/Actions/propertyId.action'
import { setProperty } from '../Actions/property.action';
import { Property } from '../Models/property';


// export interface State{
    
// }
export const initialState = new Property();

const _propertyReducer = createReducer(
  initialState,
  on(setProperty, (state,{property}) =>state=property),
  
);

export function PropertyReducer(state:any, action:any) {
  return _propertyReducer(state, action);
}
