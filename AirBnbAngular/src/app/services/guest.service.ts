import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http:HttpClient) { }
  guest(guest:any){
    return this.http.post("http://localhost:9095/api/Guests",guest)
    
  }
}
