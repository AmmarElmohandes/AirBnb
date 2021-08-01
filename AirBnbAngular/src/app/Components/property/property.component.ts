import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Property } from 'src/app/Models/property';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/State/app.state';
import { setId } from 'src/app/Actions/hosts.action';
import { setPropertyId } from 'src/app/Actions/property.action';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  constructor(private router:Router,private service:PropertyService,private store:Store<AppState>) { this.hostId=store.select('hostId')
   }
  error:string=""
  success:string=""
 submitted:boolean=true
 hostId:Observable<number>
 hostId2:number=0
  property=new Property(0,"","","","","","","",new Date,new Date,0,0);
  ngOnInit(): void {
    this.countries =
  [
    {
      "name": "India",
      "code": "IN"
    },
    {
      "name": "United Kingdom",
      "code": "UK"
    },{
      "name":"Egypt",
      "code":"Eg"
    },
    {
      "name":"France",
      "code":"Fr"
    },
    {
      "name":"USA",
      "code":"US"
    },
    {
      "name":"Germany",
      "code":"Gr"
    },
    {
      "name":"Indonesia",
      "code":"In"
    }

  ];
this.cities = [{
      "name": "Mumbai",
      "country": "India",
      "code": "MB"
    },
    {
      "name": "Delhi",
      "country": "India",
      "code": "DL"
    },
    {
      "name": "London",
      "country": "United Kingdom",
      "code": "LON"
    },
    {
      "name": "Crowly",
      "country": "United Kingdom",
      "code": "CRL"
    },
    {
      "name":"Alexandria",
      "country":"Egypt",
      "Code":"Eg"
    },
    {
      "name":"Cairo",
      "country":"Egypt",
      "Code":"Eg"
    },
    {
      "name":"Paris",
      "country":"France",
      "Code":"Fr"
    },
    {
      "name":"New York",
      "country":"USA",
      "Code":"US"
    },
    {
      "name":"Los Angeles",
      "country":"USA",
      "Code":"US"
    },
    {
      "name":"Berlin",
      "country":"Germany",
      "Code":"Gr"
    },
    {
      "name":"Bali",
      "country":"Indonesia",
      "Code":"In"
    }
  ];
    this.areas=[
      "Private Room",
       "sharedRoom"


  ];
  this.propertyTypes=
  ["Hotel Room",
  "Apartment"];
    this.form.valueChanges.subscribe(
      data=>{
        if (JSON.stringify(data) !== JSON.stringify({})) {
          if(data.Country){
           this.filteredCities = this.cities.filter(city=>city.country===data.Country);
      //     steps.filter(step => step.id === stepId)
         }
       }
      }
    )
  }
  countries:Array<any> = [];
  cities:Array<any> = [];
  filteredCities: Array<any> = [];
  areas:Array<any> = [];
  propertyTypes:Array<any> = [];
  currentDate = new Date();
  const  = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  form = new FormGroup({
    Title: new FormControl('', Validators.required),
    propertyType: new FormControl('', Validators.required),
    AreaType: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    PropertyAddress: new FormControl('', Validators.required),
    PropertyDescription: new FormControl('', Validators.required),
    AvailableStartDate: new FormControl('', Validators.required),
    AvailableEndDate: new FormControl('', Validators.required),
    PricePerNight: new FormControl('', Validators.required),
    // HostId: new FormControl('', Validators.required)


  });


  get Title() {
    return this.form.get('Title');
  }
  get propertyType() {
    return this.form.get('propertyType');
  }
  get AreaType() {
    return this.form.get('AreaType');
  }
  get City() {
    return this.form.get('City.name');
  }
  get Country() {
    return this.form.get('Country.name');
  }
  get PropertyAddress() {
    return this.form.get('PropertyAddress');
  }
  get PropertyDescription() {
    return this.form.get('PropertyDescription');
  }
  get AvailableStartDate() {
    return this.form.get('AvailableStartDate');
  }
  get AvailableEndDate() {
    return this.form.get('AvailableEndDate');
  }
  get PricePerNight() {
    return this.form.get('PricePerNight');
  }
  // get HostId() {
  //   return this.form.get('HostId');
  // }
  save()
  {

    this.error=""
    this.property = this.form.value;

    let currentPageSub :Subscription;

   currentPageSub = this.hostId.subscribe(
 (hostId: number) => {
     this.property.HostId=hostId;
     console.log(hostId)
     console.log(this.property.HostId)
 }
);


    console.log(this.property);
    this.service.postproperty(this.property).subscribe((a:any)=>{console.log(a);this.store.dispatch(setPropertyId({propertyId:a.id})); this.success="successfully added";this.submitted=false},err=>this.error=err.error)

  }

}
