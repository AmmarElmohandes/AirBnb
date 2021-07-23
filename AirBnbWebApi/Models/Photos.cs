using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Photos
    {
        [Key]
        public int id { get; set; }

        [Required]
        public byte Images { get; set; }

        [ForeignKey("id")]
        [Required]
        [Key]
        public virtual Property Propety { get; set; }
    }
}
