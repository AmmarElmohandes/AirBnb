import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = '';
  constructor(private http:HttpClient) { }
  registerNewUser(user:any,hostOruser:number){
    if(hostOruser==1){
    return this.http.post("http://localhost:9095/api/hosts",user)
    }
    else{
      return this.http.post("http://localhost:9095/api/users",user)

    }
    
  }
}
