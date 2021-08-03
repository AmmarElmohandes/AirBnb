import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BedsService {

  constructor(private http:HttpClient) { }
Bed(beds:any){
    return this.http.post("http://localhost:9095/api/Beds",beds)
    
  }
  bedSearch(id:any){
    return this.http.get("http://localhost:9095/api/Beds/"+id)
  }
}
