using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Property
    {
        public int id { get; set; }
        [Required]
        
        public string Title { get; set; }
        [Required]
        public string propertyType { get; set; }

        public string AreaType { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        public string PropertyAddress { get; set; }
        
        public string PropertyDescription { get; set; }
        [Required]
        public DateTime AvailableStartDate { get; set; }
        [Required]
        public DateTime AvailableEndDate { get; set; }
        [Required]
        public decimal PricePerNight { get; set; }
        [ForeignKey("host")]
        [Required]
        public int HostId { get; set; }


        public virtual Host? host { get; set; }

    }
}
