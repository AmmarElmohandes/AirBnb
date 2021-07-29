using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class ContactUs
    {

        public int id { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string UserEmail { get; set; }

        [Required]
        public int UserPhone { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }



    }
}
