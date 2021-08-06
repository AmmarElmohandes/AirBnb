import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Property } from 'src/app/Models/property';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/State/app.state';
import { setId } from 'src/app/Actions/hosts.action';
import { setPropertyId } from 'src/app/Actions/propertyId.action';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  constructor(
    private router: Router,
    private service: PropertyService,
    private store: Store<AppState>
  ) {
    this.hostId = store.select('hostId');
  }
  error: string = '';
  success: string = '';
  submitted: boolean = true;
  hostId: Observable<number>;
  hostId2: number = 0;
  property = new Property(
    0,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Date(),
    0,
    0
  );
  location: string = '';

  ngOnInit(): void {
    this.countries = [
      {
        name: 'India',
        code: 'IN',
      },
      {
        name: 'United Kingdom',
        code: 'UK',
      },
      {
        name: 'Egypt',
        code: 'Eg',
      },
      {
        name: 'France',
        code: 'Fr',
      },
      {
        name: 'USA',
        code: 'US',
      },
      {
        name: 'Germany',
        code: 'Gr',
      },
      {
        name: 'Indonesia',
        code: 'In',
      },
    ];
    this.cities = [
      {
        name: 'Mumbai',
        country: 'India',
        code: 'MB',
      },
      {
        name: 'Delhi',
        country: 'India',
        code: 'DL',
      },
      {
        name: 'London',
        country: 'United Kingdom',
        code: 'LON',
      },
      {
        name: 'Crowly',
        country: 'United Kingdom',
        code: 'CRL',
      },
      {
        name: 'Alexandria',
        country: 'Egypt',
        Code: 'Eg',
      },
      {
        name: 'Cairo',
        country: 'Egypt',
        Code: 'Eg',
      },
      { name: 'Sharm Elsheikh', country: 'Egypt', Code: 'Eg' },
      { name: 'Hurghada', country: 'Egypt', Code: 'Eg' },
      { name: 'Aswan', country: 'Egypt', Code: 'Eg' },
      { name: 'Luxor', country: 'Egypt', Code: 'Eg' },
      { name: '6 October', country: 'Egypt', Code: 'Eg' },
      { name: 'Giza', country: 'Egypt', Code: 'Eg' },
      { name: 'Matruh', country: 'Egypt', Code: 'Eg' },
      {
        name: 'Paris',
        country: 'France',
        Code: 'Fr',
      },
      {
        name: 'New York',
        country: 'USA',
        Code: 'US',
      },
      {
        name: 'Los Angeles',
        country: 'USA',
        Code: 'US',
      },
      {
        name: 'Berlin',
        country: 'Germany',
        Code: 'Gr',
      },
      {
        name: 'Bali',
        country: 'Indonesia',
        Code: 'In',
      },
    ];
    this.areas = [
      { name: 'Private Room', key: 'Apartment' },
      { name: 'shared Room', key: 'Apartment' },
      { name: 'Whole Apartment ', key: 'Apartment' },
      { name: 'Single Room', key: 'Hotel' },
      { name: 'Double Room', key: 'Hotel' },
      { name: 'Suite', key: 'Hotel' },
      { name: 'Studio', key: 'Apartment' },
    ];
    this.propertyTypes = [{ name: 'Hotel' }, { name: 'Apartment' }];
    this.form.valueChanges.subscribe((data) => {
      if (JSON.stringify(data) !== JSON.stringify({})) {
        if (data.Country) {
          this.filteredCities = this.cities.filter(
            (city) => city.country === data.Country
          );
          
        } else if (data.propertyType) {
          this.filteredAreas = this.areas.filter(
            (area) => area.key === data.propertyType
          );
        }
      }
    });
  }
  countries: Array<any> = [];

  cities: Array<any> = [];
  filteredCities: Array<any> = [];
  filteredAreas: Array<any> = [];

  areas: Array<any> = [];
  propertyTypes: Array<any> = [];
  currentDate = new Date();
  const = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  form = new FormGroup({
    Title: new FormControl('', Validators.required),
    propertyType: new FormControl('', Validators.required),
    AreaType: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    PropertyDescription: new FormControl('', Validators.required),
    AvailableStartDate: new FormControl('', Validators.required),
    AvailableEndDate: new FormControl('', Validators.required),
    PricePerNight: new FormControl('', Validators.required),
    
  });

  get Title() {
    return this.form.get('Title');
  }
  get propertyType() {
    return this.form.get('propertyType.name');
  }
  get AreaType() {
    return this.form.get('AreaType.name');
  }
  get City() {
    return this.form.get('City.name');
  }
  get Country() {
    return this.form.get('Country.name');
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
 
  save() {
    if (this.location == '') {
      this.error = 'Property Address missing';
      return;
    }
    this.error = '';
    if (this.location == '') {
      this.error = 'Property Address missing';
    } else if (this.form.get('PricePerNight')?.pristine) {
      this.error = 'Please enter the price per night';
    } else if (this.form.get('AvailableStartDate')?.pristine) {
      this.error = 'Please the Available from date';
    } else if (this.form.get('AvailableEndDate')?.pristine) {
      this.error = 'Please enter Available to date';
    } else if (this.form.get('Country')?.pristine) {
      this.error = 'Select a country';
    } else if (this.form.get('City')?.pristine) {
      this.error = 'select a city';
    } else if (this.form.get('PropertyType')?.pristine) {
      this.error = 'Please select the Property Type';
    } else if (this.form.get('AreaType')?.pristine) {
      this.error = 'Please select the Area Type';
    } else if (this.form.get('Title')?.pristine) {
      this.error = 'Please enter the title';
    }
    this.property = this.form.value;
    if (this.property.propertyType == '') {
      this.error = 'Property Type missing';
      return;
    }
    if (this.property.areaType == '') {
      this.error = 'Area Type missing';
      return;
    }

    let currentPageSub: Subscription;

    currentPageSub = this.hostId.subscribe((hostId: number) => {
      this.property.HostId = hostId;
    });
    this.property.propertyAddress = this.location;
    if (this.error == '') console.log(this.property);
    this.service.postproperty(this.property).subscribe((a: any) => {
      console.log(a);
      this.store.dispatch(setPropertyId({ propertyId: a.id }));
      this.success = 'successfully added';
      this.submitted = false;
    });
  }
  setLocation(loc: string) {
    this.location = loc;
  }
}
