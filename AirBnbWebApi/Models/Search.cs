using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Search
    {
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int NoOfAdultGuests { get; set; }
        public int NoOfChildGuests {get;set;}
        public string City { get; set; }
        public string Country { get; set; }

    }
}
