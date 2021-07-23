import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = '';
  constructor(private http:HttpClient) { }
  logIn(credentials:any){
    return this.http.post(this.url,JSON.stringify(credentials))
    .pipe(map((response : any) => {
      let result = response;
      if (result && result.token){
        localStorage.setItem('token', result.token);
        return true;
      }
      return false;
    }))
  }

  logout(){
    localStorage.removeItem('token');

  }
  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token :any = localStorage.getItem('token');
    let isExpired = jwtHelper.isTokenExpired(token);
    
    return !isExpired;

  }
}
