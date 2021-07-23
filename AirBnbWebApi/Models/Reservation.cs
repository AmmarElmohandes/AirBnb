using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Reservation
    {
        public int id { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        [NotMapped]
        public decimal PricePerNight { get; set; }
        public decimal TotalPrice { get { return (CheckOut.Day - CheckIn.Day) * PricePerNight; } set { value= (CheckOut.Day - CheckIn.Day) * PricePerNight; } }
        [ForeignKey("user")]
        public int UserId { get; set; }
        public int PropertyId { get; set; }

        public virtual User? user { get; set; }
        public virtual Property? Property { get; set; }


    }
}
