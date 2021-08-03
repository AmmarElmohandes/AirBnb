import { createAction, props } from '@ngrx/store';
import { Property } from '../Models/property';

export const setProperties = createAction('[Home Component] setProperties ',props<{properties:Array<Property>
    
//    [ {id?:number, Title?:string, propertyType?:string, AreaType?:string, City?:string, Country?:string, PropertyAddress?:string, PropertyDescription?:string, AvailableStartDate?:Date, AvailableEndDate?:Date, PricePerNight?:number,HostId?:number}]

}>());