import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import '../../../assets/js/jquery.min.js'
import '../../../assets/bootstrap/js/bootstrap.min.js'
import '../../../assets/js/jquery.easing.min.js'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Search } from 'src/app/Models/search';
import { SearchService } from 'src/app/services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/app.state';
import { setProperties } from 'src/app/Actions/search.action';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/Models/property';
import { Router } from '@angular/router';
import { setReservation } from 'src/app/Actions/reservation.action';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  
  constructor(public authService: AuthService,public searchServie:SearchService,private store:Store<AppState>,private router:Router) { }

  countries:Array<any> = [];
  cities:Array<any> = [];
  filteredCities: Array<any> = [];
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
    },
    {
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
      "code":"Eg"
    },
    {
      "name":"Cairo",
      "country":"Egypt",
      "Code":"Eg"
    }
    ,
    {"name":"Sharm Elsheikh",
    "country":"Egypt",
    "Code":"Eg"
  },
 { "name":"Hurghada",
  "country":"Egypt",
  "Code":"Eg"
},
{ "name":"Aswan",
"country":"Egypt",
"Code":"Eg"
},
{ "name":"Luxor",
"country":"Egypt",
"Code":"Eg"
},
{ "name":"6 October",
"country":"Egypt",
"Code":"Eg"
},
{ "name":"Giza",
"country":"Egypt",
"Code":"Eg"
},
{ "name":"Matruh",
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



    this.searchForm.valueChanges.subscribe(
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
  searchForm=new FormGroup({
    CheckIn: new FormControl('', Validators.required),
    CheckOut:new FormControl('', Validators.required),
    NoOfAdultGuests:new FormControl('', Validators.required),
    NoOfChildGuests:new FormControl('', Validators.required),
    Country:new FormControl('', Validators.required),
    City:new FormControl('', Validators.required)

  })
  search=new Search(new Date(),new Date(),"","",0,0)
  currentDate = new Date();
  const  = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  get Country() {
    return this.searchForm.get('Country.name');
  }
  get City() {
    return this.searchForm.get('City.name');
  }
  property=new Property(0,"","","","","","","",new Date,new Date,0,0);
save(){
  this.search=this.searchForm.value
  this.store.dispatch(setReservation({search:this.search}))
this.searchServie.search(this.search).subscribe((a:any)=>{console.log(a); this.store.dispatch(
  setProperties({properties:a}) 
  );
  this.router.navigate(['/search'])


})
}
}


