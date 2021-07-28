using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Photos
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string ImageName { get; set; }
        [ForeignKey("Property")]
        [Required]
        public int PropertyId { get; set; }
       
        public virtual Property Property { get; set; }
    }
}
