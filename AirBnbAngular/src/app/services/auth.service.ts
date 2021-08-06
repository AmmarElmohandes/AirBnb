import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../State/app.state';
import { Observable, Subscription } from 'rxjs';
import { sethostOruser } from '../Actions/hostOruser.action';
import { setId } from '../Actions/hosts.action';
import { setPropertyId } from '../Actions/propertyId.action';
import { setUserId } from '../Actions/user.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private url = ;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.hostOruser = store.select('hostOruser');
  }
  hostOruser: Observable<number>;
  logIn(credentials: any, hostOruser: number) {
    if (hostOruser == 1) {
      return this.http
        .post('http://localhost:9095/api/hosts/login', credentials)
        .pipe(
          map((response: any) => {
            let result = response;
            if (result && result.token) {
              localStorage.setItem('token', result.token);
            
              return result;
            }
           
          })
        );
    } else {
      return this.http
        .post('http://localhost:9095/api/users/login', credentials)
        .pipe(
          map((response: any) => {
            let result = response;
            if (result && result.token) {
              localStorage.setItem('token', result.token);
            
              return result;
            }
           
          })
        );
    }
  }
  flag: number = 0;
  logout() {
    let currentPageSub: Subscription;

    currentPageSub = this.hostOruser.subscribe((hostOruser: number) => {
      this.flag = hostOruser;
    });
    localStorage.removeItem('token');
   
    if (this.flag == 1) {
      this.store.dispatch(setId({ hostId: 0 }));
      this.store.dispatch(sethostOruser({ hostOruser: 0 }));
      this.store.dispatch(setPropertyId({ propertyId: 0 }));
      this.store.dispatch(setUserId({ userId: 0 }));
    } else {
      this.store.dispatch(sethostOruser({ hostOruser: 0 }));
    }
    this.router.navigate(['']);
  }
  checkHost() {
    let currentPageSub: Subscription;

    currentPageSub = this.hostOruser.subscribe((hostOruser: number) => {
      this.flag = hostOruser;
    });
    if (this.flag == 1) {
      return true;
    } else return false;
  }
  setFlag(num: number) {
    this.store.dispatch(sethostOruser({ hostOruser: num }));
  }
  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token: any = localStorage.getItem('token');
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }
 
}
