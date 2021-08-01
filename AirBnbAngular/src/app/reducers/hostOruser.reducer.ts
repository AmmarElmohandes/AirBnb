import { Action, createReducer, on, State } from '@ngrx/store';
import { setId, resetId } from 'src/app/Actions/hosts.action'
import { sethostOruser } from '../Actions/hostOruser.action';


// export interface State{
    
// }
export const initialState = 0;

const _hostOruserReducer = createReducer(
  initialState,
  on(sethostOruser, (state,{hostOruser}) =>state=hostOruser),
  on(resetId, (state) => 0)
);

export function HostOrUserReducer(state:any, action:any) {
  return _hostOruserReducer(state, action);
}
