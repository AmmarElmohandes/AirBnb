import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { setId } from 'src/app/Actions/hosts.action';
import { AppState } from 'src/app/State/app.state';
import { setUserId } from 'src/app/Actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.hostId = store.select('hostId');
    this.hostoruser = store.select('hostOruser');
  }

  error: string = '';
  flag: number = 0;
  hostoruser: Observable<number>;
  hostId: Observable<number>;
  ngOnInit(): void {}
  invalidLogin = false;

  form = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });
  login() {
    let currentPageSub: Subscription;

    currentPageSub = this.hostoruser.subscribe((hostOruser: number) => {
      this.flag = hostOruser;
    });
    let credentials = this.form.value;
    this.authService.logIn(credentials, this.flag).subscribe(
      (result: any) => {
        if (result.id > 0) {
          console.log(this.flag);
          if (this.flag == 1) {
            this.store.dispatch(setId({ hostId: result.id }));
            this.router.navigate(['']);
          } else if (this.flag == 2) {
            this.store.dispatch(setUserId({ userId: result.id }));
            this.router.navigate(['']);
          }
        }
        this.invalidLogin = true;
      },
      (err) => {
        this.error = err.error.errorMessage;
        console.log(err.error.errorMessage);
      }
    );
  }
}
