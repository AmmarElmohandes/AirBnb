import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beds } from 'src/app/Models/beds';
import { BedsService } from 'src/app/services/beds.service';
import { AppState } from 'src/app/State/app.state';

@Component({
  selector: 'beds',
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.css'],
})
export class BedsComponent implements OnInit {
  submitted: boolean = true;
  beds = new Beds(0, 0, 0);
  success: string = '';
  propertyId: Observable<number>;
  constructor(
    private router: Router,
    private service: BedsService,
    private store: Store<AppState>
  ) {
    this.propertyId = store.select('propertyId');
  }
  error: string = '';

  ngOnInit(): void {}
  form = new FormGroup({
    noOfKingbeds: new FormControl(''),
    noOfSinglebeds: new FormControl(''),
    noOfDoublebeds: new FormControl(''),
  });
  get NoOfKingbeds() {
    return this.form.get('noOfKingbeds');
  }
  get NoOfSinglebeds() {
    return this.form.get('noOfSinglebeds');
  }
  get NoOfDoublebeds() {
    return this.form.get('noOfDoublebeds');
  }

  bed() {
    // if (this.form.get('noOfKingbeds')) {
    //   this;
    // }
    this.error = '';

    this.beds = this.form.value;
    if (
      this.form.get('noOfKingbeds')?.value == '' ||
      this.form.get('noOfKingbeds')?.pristine
    ) {
      this.beds.noOfKingbeds = 0;
    }
    if (
      this.form.get('noOfSinglebeds')?.value == '' ||
      this.form.get('noOfSinglebeds')?.pristine
    ) {
      this.beds.noOfSinglebeds = 0;
    }
    if (
      this.form.get('noOfDoublebeds')?.value == '' ||
      this.form.get('noOfDoublebeds')?.pristine
    ) {
      this.beds.noOfDoublebeds = 0;
    }

    let currentPageSub: Subscription;

    currentPageSub = this.propertyId.subscribe((propertyId: number) => {
      this.beds.PropertyId = propertyId;
      console.log(propertyId);
      console.log(this.beds.PropertyId);
    });

    console.log(this.beds);
    this.service.Bed(this.beds).subscribe(
      (a) => {
        console.log(a);
        (this.success = 'successfuly added'), (this.submitted = false);
      },
      (err) => (this.error = err.error)
    );
  }
}
