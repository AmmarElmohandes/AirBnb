import { RegisterService } from './services/register.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { BedsComponent } from './Components/beds/beds.component';
import { GuestsComponent } from './Components/guests/guests.component';
import { PropertyComponent } from './Components/property/property.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { HostReducer } from './reducers/hosts.reducer';
import { PhotosComponent } from './Components/photos/photos.component';
import { SearchComponent } from './Components/search/search.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { ThankyouComponent } from './Components/thankyou/thankyou.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchbarComponent } from './Components/searchbar/searchbar.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { GooglemapComponent } from './Components/googlemap/googlemap.component';
// import { AgmCoreModule } from '@agm/core';
// import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    BedsComponent,
    GuestsComponent,
    PropertyComponent,
    PhotosComponent,
    SearchComponent,
    ReservationComponent,
    ThankyouComponent,
    NavbarComponent,
    SearchbarComponent,
    GooglemapComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    GoogleMapsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'beds', component: BedsComponent },
      { path: 'guests', component: GuestsComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'photos', component:PhotosComponent},
      {path:'search',component:SearchComponent},
      {path:'reserve',component:ReservationComponent},
      {path:'thanks',component:ThankyouComponent},
      { path: '**', component: NotFoundComponent },
    ]),
   
    StoreModule.forRoot(reducers,{metaReducers}),
    
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent],
})

export class AppModule {}
