using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Beds
    {
        [Key]
        public int id { get; set; }

        public int? NoOfKingbeds { get; set; }

        public int? NoOfSinglebeds { get; set; }

        public int? NoOfDoublebeds { get; set; }

        [ForeignKey("id")]
        [Required]
        [Key]
        public virtual Property Propety { get; set; }

    }
}
