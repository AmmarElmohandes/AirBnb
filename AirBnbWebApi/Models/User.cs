using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class User
    {
        public int id { get; set; }
        [Required]
        [Remote("UserNameExists", "Users", ErrorMessage = "User Name already in use")]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        [Remote("UserEmailExists", "Users", ErrorMessage = "Email already in use")]

        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", ErrorMessage = "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")]
        public string Password { get; set; }
        [Required]
        [NotMapped]
        [Compare("Password")]
        public string confirmPassword { get; set; }
        [Required]
        [RegularExpression(@"^(201)[0-9]{9}$")]
        [Remote("UserPhoneExists", "Users", ErrorMessage = "Phone already in use")]

        public string PhoneNumber { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Range(18, 100)]
        public int Age { get { return int.Parse((DateTime.Now.Year - BirthDate.Year).ToString()); } set { value = int.Parse((DateTime.Now.Year - BirthDate.Year).ToString()); } }

        public string Gender { get; set; }

    }
}
