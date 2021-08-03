import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  search(searchData:any){
  return  this.http.post("http://localhost:9095/api/properties/search",searchData).pipe(map((response:any)=>{
    let result=response;
    return result.$values
    
  }))
}
}