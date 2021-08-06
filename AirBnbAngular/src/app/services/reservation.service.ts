import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  addReservation(reservation:any){
return this.http.post("http://localhost:9095/api/reservations",reservation)
  }
}
