import { Action, createReducer, on, State } from '@ngrx/store';
import { setUserId } from 'src/app/Actions/user.action'


// export interface State{
    
// }
export const initialState = 0;

const _userReducer = createReducer(
  initialState,
  on(setUserId, (state,{userId}) =>state=userId),
  
);

export function UserReducer(state:any, action:any) {
  return _userReducer(state, action);
}
