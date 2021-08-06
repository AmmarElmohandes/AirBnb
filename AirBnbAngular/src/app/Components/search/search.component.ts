import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setProperty } from 'src/app/Actions/property.action';
import { setPropertyId } from 'src/app/Actions/propertyId.action';
import { Beds } from 'src/app/Models/beds';
import { Property } from 'src/app/Models/property';
import { Reservation } from 'src/app/Models/reservation';
import { Search } from 'src/app/Models/search';
import { BedsService } from 'src/app/services/beds.service';
import { AppState } from 'src/app/State/app.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private bedsService: BedsService,
    private router: Router
  ) {}
  properties: Array<Property> = [];
  hostoruser: number = 0;
  beds: Array<Beds> = [];
  error: string = '';
  search = new Search();
  userId: number = 0;
  noPropsFound: boolean = false;
  ngOnInit(): void {
    let currentPageSub: Subscription;

    currentPageSub = this.store
      .select('properties')
      .subscribe((props: Array<Property>) => {
        this.properties = props;
      });
    currentPageSub = this.store.select('search').subscribe((props: Search) => {
      this.search = props;
    });
  }
  reserve(id: any, prop: any) {
    this.store.dispatch(setPropertyId({ propertyId: id }));
    this.store.dispatch(setProperty({ property: prop }));
    let currentPageSub: Subscription;

    currentPageSub = this.store
      .select('hostOruser')
      .subscribe((props: number) => {
        this.hostoruser = props;
        
      });
    if (this.hostoruser == 2) {
      this.router.navigate(['/reserve']);
    } else {
      this.error = 'Invaid must login as a user first';
    }
  }
}
