import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { setPropertyId } from 'src/app/Actions/propertyId.action';
import { Guest } from 'src/app/Models/guest';
import { GuestService } from 'src/app/services/guest.service';
import { AppState } from 'src/app/State/app.state';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  constructor(
    private router: Router,
    private guestService: GuestService,
    private store: Store<AppState>
  ) {
    this.propertyId = store.select('propertyId');
  }
  error: string = '';
  propertyId: Observable<number>;
  guest = new Guest(0, 0, 0, 0);
  submitted: boolean = true;
  success: string = '';

  ngOnInit(): void {}
  form = new FormGroup({
    NoOfAdultGuests: new FormControl(''),
    NoOfChildGuests: new FormControl(''),
  });
  get NoOfAdultGuests() {
    return this.form.get('NoOfAdultGuests');
  }
  get NoOfChildGuests() {
    return this.form.get('NoOfChildGuests');
  }

  guestNoAdd() {
    this.guest = this.form.value;
    if (this.form.get('NoOfAdultGuests')?.value == '') {
      this.guest.NoOfAdultGuests = 0;
    }
    if (this.form.get('NoOfChildGuests')?.value == '') {
      this.guest.NoOfChildGuests = 0;
    }

    let currentPageSub: Subscription;

    currentPageSub = this.propertyId.subscribe((propertyId: number) => {
      this.guest.PropertyId = propertyId;
      console.log(propertyId);
      console.log(this.guest.PropertyId);
    });
    console.log(this.guest);
    this.guestService.guest(this.guest).subscribe(
      (a) => {
        console.log(a);
        (this.success = 'successfuly added'), (this.submitted = false);
      },
      (err) => (this.error = err.error)
    );
  }
}
