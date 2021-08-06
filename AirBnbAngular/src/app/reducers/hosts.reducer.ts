import { Action, createReducer, on, State } from '@ngrx/store';
import { setId } from 'src/app/Actions/hosts.action'


// export interface State{
    
// }
export const initialState = 0;

const _hostReducer = createReducer(
  initialState,
  on(setId, (state,{hostId}) =>state=hostId),
  
);

export function HostReducer(state:any, action:any) {
  return _hostReducer(state, action);
}
