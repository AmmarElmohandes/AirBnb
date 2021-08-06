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
  constructor(
    private router: Router,
    private service: RegisterService,
    private store: Store<AppState>
  ) {
    this.hostoruser = store.select('hostOruser');
  }
  error: string = '';
  hostoruser: Observable<number>;
  flag: number = 0;
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
    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/01[0-9]{9}/),
    ]),
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
    this.error = '';
    let currentPageSub: Subscription;

    currentPageSub = this.hostoruser.subscribe((hostOruser: number) => {
      this.flag = hostOruser;
    });
    let user = this.form.value;
    if (this.form.get('Password')?.pristine||this.form.get('Password')?.errors) {
      this.error = 'Please enter a valid password';
    } else if (this.form.get('ConfirmPassword')?.pristine||this.form.get('ConfirmPassword')?.errors) {
      this.error = 'Confirm your password';
    } else if (this.form.get('BirthDate')?.pristine) {
      this.error = 'Please enter your bith date';
    } else if (this.form.get('Gender')?.pristine) {
      this.error = 'Please enter your Gender';
    } else if (this.form.get('PhoneNumber')?.pristine||this.form.get('PhoneNumber')?.errors) {
      this.error = 'Please valid phone number';
    } else if (this.form.get('Email')?.errors) {
      this.error = 'please enter another email as example@example.com';
    }else if(this.form.get('UserName')?.errors){
      this.error='enter a valid userName'
    }
    else if(this.form.get('FirstName')?.errors){
      this.error='enter a valid userName'
    }
    else if(this.form.get('LastName')?.errors){
      this.error='enter a valid userName'
    }
    // else if (this.form.get('Password')?.errors) {
    //   this.error = 'password must be atleast 8 characters including a capital letter and digits ';
    // }

   
    if (this.error == '') {
      this.service.registerNewUser(user, this.flag).subscribe(
        (a) => {
         
          this.router.navigate(['login']);
        },
        (err) => (this.error = err.error)
      );
    }
  }
}
