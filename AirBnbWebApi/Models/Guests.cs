using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Guests
    {
        [Key]
        public int id { get; set; }

        public int NoOfAdultGuests { get; set; }

        public int NoOfChildGuests { get; set; }

        [ForeignKey("Property")]
        [Required]
        public int PropertyId { get; set; }
        public virtual Property Propety { get; set; }
    }
}
