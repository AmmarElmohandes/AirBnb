import { Observable } from "rxjs";

export class Property {
    constructor(public id?:number,public Title?:string,public propertyType?:string,public AreaType?:string,public City?:string,public Country?:string,public PropertyAddress?:string,public PropertyDescription?:string,public AvailableStartDate?:Date,public AvailableEndDate?:Date,public PricePerNight?:number,public HostId?:number)
    {
     
    }
}
