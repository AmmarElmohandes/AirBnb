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

}

