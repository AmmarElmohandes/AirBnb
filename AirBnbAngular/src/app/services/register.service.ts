import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = '';
  constructor(private http:HttpClient) { }
  registerNewUser(user:any){
    return this.http.post(this.url,user)
    
  }
}
