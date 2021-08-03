export class Search {
    constructor(public CheckIn?:Date,
        public CheckOut?:Date,
       public  Country?:string,
       public City?:string,
       public  NoOfAdults?:number,
       public  NoOfChilds?:number,
       public  pricePerNight?:number,
       public  totalPrice?:number
       ){}
}
