import { RegisterService } from '../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/app.state';
import { Observable, Subscription } from 'rxjs';
// import { error } from 'console';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private service: RegisterService,private store:Store<AppState>) {this.hostoruser=store.select('hostOruser')}
error:string=""
hostoruser:Observable<number>
flag:number=0
  ngOnInit() {}
  form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    ]),
    Password: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', [Validators.required,Validators.pattern(/201[0-9]{9}/)]),
    BirthDate: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
  });

  get firstName() {
    return this.form.get('FirstName');
  }
  get lastName() {
    return this.form.get('LastName');
  }
  get userName() {
    return this.form.get('UserName');
  }
  get email() {
    return this.form.get('Email');
  }
  get phoneNumber() {
    return this.form.get('PhoneNumber');
  }
  get birthDate() {
    return this.form.get('BirthDate');
  }
  get gender() {
    return this.form.get('Gender');
  }
  get password() {
    return this.form.get('Password');
  }
  get confirmPassword() {
    return this.form.get('ConfirmPassword');
  }

  register() {
    let currentPageSub :Subscription;

    currentPageSub = this.hostoruser.subscribe(
  (hostOruser: number) => {
      this.flag=hostOruser;
      //console.log(propertyId)
      //console.log(this.photo.PropertyId)
  }
 );
    let user = this.form.value;
    console.log(user);
    this.service.registerNewUser(user,this.flag).subscribe(a=>{console.log(a);
        this.router.navigate(['login']);
         
    },err=>this.error=err.error
 
    )
    
    
    
    }
}