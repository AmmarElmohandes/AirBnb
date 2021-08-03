import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appsactivity_v1 } from 'googleapis';
import { Subscription } from 'rxjs';
import { Photos } from 'src/app/Models/photos';
import { Property } from 'src/app/Models/property';
import { Reservation } from 'src/app/Models/reservation';
import { Search } from 'src/app/Models/search';
import { PhotosService } from 'src/app/services/photos.service';
import { PropertyService } from 'src/app/services/property.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { AppState } from 'src/app/State/app.state';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private store:Store<AppState>,private photoServices:PhotosService,private reservationService:ReservationService,private router:Router) { }
property:Property=new Property()
price:number=0
reservation:Reservation=new Reservation()
search:Search=new Search(new Date(),new Date(),"","",0,0)
userId:number=0
photos:Array<Photos>=[]
flag:boolean=false
  ngOnInit(): void {
    let currentPageSub :Subscription;

    currentPageSub = this.store.select('property').subscribe(
  (props: Property) => {
      this.property=props;   
      console.log(this.property)
  }
  


 );
 currentPageSub = this.store.select('search').subscribe(
  (props: Search) => {
      this.search=props;   
      // console.log(this.property)
  }
  


 );
 currentPageSub = this.store.select('userId').subscribe(
  (props: number) => {
      this.userId=props;   
      // console.log(this.property)
  }
  


 );
 

 this.photoServices.getphotos(this.property.id).subscribe(a=>{console.log(a);this.photos=a;console.log(this.photos[0].imageName)})

  }

  checkOut(){
    
    this.reservation.checkIn=this.search.CheckIn
this.reservation.checkOut=this.search.CheckOut
this.reservation.pricePerNight=this.property.pricePerNight
this.reservation.propertyId=this.property.id
this.reservation.userId=this.userId
    this.reservationService.addReservation(this.reservation).subscribe((a:any)=>{console.log(a);this.price=a.totalPrice})
    this.flag=true

  }
  navigate(){
    this.router.navigate([''])
  }


}
