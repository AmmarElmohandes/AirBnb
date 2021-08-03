export class Reservation {
    constructor(public id?:number,public checkIn?:Date,public checkOut?:Date,public userId?:number,public propertyId?:number,public pricePerNight?:number,public totalPrice?:number){}
}
