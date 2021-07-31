import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private url = ;
  constructor(private http:HttpClient) { }
  logIn(credentials:any,hostOruser:number){
    if(hostOruser==1){
    return this.http.post("http://localhost:9095/api/hosts/login",credentials)
    .pipe(map((response : any) => {
      let result = response;
      if (result && result.token){
        localStorage.setItem('token', result.token);
        localStorage.setItem('hostId',result.id)
        return result.id;
      }
      return 0;
    }))
  }else{
    return this.http.post("http://localhost:9095/api/users/login",credentials)
    .pipe(map((response : any) => {
      let result = response;
      if (result && result.token){
        localStorage.setItem('token', result.token);
        localStorage.setItem('hostId',result.id)
        return result.id;
      }
      return 0;
    })) 
  }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('hostId');

  }
  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token :any = localStorage.getItem('token');
    let isExpired = jwtHelper.isTokenExpired(token);
    
    return !isExpired;

  }
}
