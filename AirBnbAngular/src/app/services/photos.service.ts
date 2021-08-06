import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http:HttpClient) { }

  getphotos(id:any){
    return this.http.get("http://localhost:9095/api/photos/"+id).pipe(map((response:any)=>{
let result=response;
return result.$values
    })
    )
    
  }
}
