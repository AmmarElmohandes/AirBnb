
import { Action, createReducer, on, State } from '@ngrx/store';
import { setProperties } from 'src/app/Actions/search.action'
import { Property } from '../Models/property';
import { AppState } from '../State/app.state';

export const initialState:Array<Property>=[]
// new Property(0,"","","","","","","",new Date,new Date,0,0);

  

const _searchReducer = createReducer(
  initialState,
  on(setProperties, (state,{properties}) =>state=properties),

);

export function SearchReducer(state:any, action:any) {
  return _searchReducer(state, action);
}
