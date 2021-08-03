import { Observable } from "rxjs";
import { Beds } from "./beds";
import { Photos } from "./photos";

export class Property {
    constructor(public id?:number,public title?:string,public propertyType?:string,public areaType?:string,public city?:string,public country?:string,public propertyAddress?:string,public propertyDescription?:string,public availableStartDate?:Date,public availableEndDate?:Date,public pricePerNight?:number,public HostId?:number,public beds?:Beds,public imageName?:string)
    {
     
    }
}
