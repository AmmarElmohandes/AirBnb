import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseurl:string="http://localhost:9095/api/Properties";

  constructor(private http:HttpClient) { }
  
  postproperty(prop:any)
  {
   return this.http.post("http://localhost:9095/api/Properties",prop)
  }
  
}
