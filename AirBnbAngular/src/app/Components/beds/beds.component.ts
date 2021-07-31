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
  styleUrls: ['./beds.component.css']
})
export class BedsComponent implements OnInit {
submitted:boolean=true
beds=new Beds(0,0,0)
success:string=""
propertyId:Observable<number>
  constructor(private router: Router, private service: BedsService,private store:Store<AppState>) {this.propertyId=store.select('propertyId') }
  error:string=""

  ngOnInit(): void {

  }
form = new FormGroup({
  NoOfKingbeds: new FormControl(''),
  NoOfSinglebeds: new FormControl(''),
  NoOfDoublebeds: new FormControl(''),
 
})
  get NoOfKingbeds() {
    return this.form.get('NoOfKingbeds');
  }
  get NoOfSinglebeds() {
    return this.form.get('NoOfSinglebeds');
  }
  get NoOfDoublebeds() {
    return this.form.get('NoOfDoublebeds');
  }
  
  bed()
  {
    
    
     this.beds = this.form.value;
     let currentPageSub :Subscription;

     currentPageSub = this.propertyId.subscribe(
   (propertyId: number) => {
       this.beds.PropertyId=propertyId;
       console.log(propertyId)
       console.log(this.beds.PropertyId)
   }
  );
     //this.beds.PropertyId=4
    console.log(this.beds);
    this.service.Bed(this.beds).subscribe(a=>{console.log(a);this.success="successfuly added",this.submitted=false},err=>this.error=err.error)
      
}
}


