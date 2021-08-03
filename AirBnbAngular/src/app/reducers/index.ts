import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { SearchService } from '../services/search.service';
import { AppState } from '../State/app.state';
import { HostOrUserReducer } from './hostOruser.reducer';
import { HostReducer } from './hosts.reducer';
import { hydrationMetaReducer } from './hydration.reducers';
import { PropertyReducer } from './property.reducer';
import { PropertyIdReducer } from './propertyId.reducer';
import { ReservationReducer } from './reservation.reducer';
import { SearchReducer } from './search.reducer';
import { UserReducer } from './user.reducer';

export interface State {

}

export const reducers: ActionReducerMap<AppState> = {
hostId:HostReducer,
propertyId:PropertyIdReducer,
hostOruser:HostOrUserReducer,
properties:SearchReducer,
property:PropertyReducer,
userId:UserReducer,
search:ReservationReducer

};


export const metaReducers: MetaReducer[]=[hydrationMetaReducer]
