import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setId } from 'src/app/Actions/hosts.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router:Router,
    private authService: AuthService,
    private store:Store<{hostId:number}>
  ) {
    this.hostId=store.select('hostId')
  }
hostId:Observable<number>
  ngOnInit(): void {}
    invalidLogin = false;
    
    form = new FormGroup({
    Email: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
  });
  login(){
    let credentials = this.form.value;
    this.authService.logIn(credentials,1)
    .subscribe(result =>{
      if(result>0)
      {
      console.log(result)
      this.router.navigate(['property']);
      }
      this.invalidLogin = true;
      
     this.store.dispatch(setId({hostId:result}))
    });

  }
}
