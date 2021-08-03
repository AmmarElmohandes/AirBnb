import { Property } from "../Models/property";
import { Search } from "../Models/search";

export interface AppState {
    properties:Array<Property>
  hostId: number;
  propertyId:number;
  hostOruser:number;
 property:Property;
 userId:number;
 search:Search
//   searchData:Search
//   searchData:{
// checkIn:Date
// CheckOut:Date
// Country:string
// City:string
// NoOfAdults:number
// NoOfChilds:number

//   };

//   {
    //  id?:number, Title?:string, propertyType?:string, AreaType?:string, City?:string, Country?:string, PropertyAddress?:string, PropertyDescription?:string, AvailableStartDate?:Date, AvailableEndDate?:Date, PricePerNight?:number,HostId?:number
//   }
}

