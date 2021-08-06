using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class Host
    {
        public int id { get; set; }
        [Required]
        [Remote("HostUserNameExists", "Hosts", ErrorMessage = "User Name already in use")]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        [Remote("HostEmailExists", "Hosts", ErrorMessage = "Email already in use")]

        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$",ErrorMessage= "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")]
        public string Password { get; set; }
        [Required]
        [NotMapped]
        [Compare("Password")]
        public string confirmPassword { get; set; }
        [Required]
        [RegularExpression(@"^(01)[0-9]{9}$")]
        [Remote("HostPhoneExists", "Hosts", ErrorMessage = "Phone already in use")]

        public string PhoneNumber { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
      
        public int Age { get { return int.Parse((DateTime.Now.Year - BirthDate.Year).ToString()); }set {value= int.Parse((DateTime.Now.Year - BirthDate.Year).ToString()); } }

        public string Gender { get; set; }
        public virtual List<Property>? properties { get; set; }

        
        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
            
            
        //    if (airBnbDbContext.hosts.FirstOrDefault(a => a.UserName == UserName) != null)
        //    {
        //       yield return new ValidationResult($"This name is not available");
        //    }
        //    if (airBnbDbContext.hosts.FirstOrDefault(a => a.Email == Email) != null)
        //    {
        //        yield return new ValidationResult($"This name is not available");
        //    }
        //    if (airBnbDbContext.hosts.FirstOrDefault(a => a.PhoneNumber == PhoneNumber) != null)
        //    {
        //        yield return new ValidationResult($"This name is not available");
        //    }

        //}
    }
}
