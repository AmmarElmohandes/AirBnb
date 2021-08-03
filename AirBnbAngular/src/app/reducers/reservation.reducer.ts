import { Action, createReducer, on, State } from '@ngrx/store';
import { setPropertyId, resetId } from 'src/app/Actions/propertyId.action'
import { setProperty } from '../Actions/property.action';
import { setReservation } from '../Actions/reservation.action';
import { Property } from '../Models/property';
import { Search } from '../Models/search';


// export interface State{
    
// }
export const initialState = new Search();

const _reservationReducer = createReducer(
  initialState,
  on(setReservation, (state,{search}) =>state=search),
  
);

export function ReservationReducer(state:any, action:any) {
  return _reservationReducer(state, action);
}
