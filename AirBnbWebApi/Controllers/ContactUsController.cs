using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class ContactUsController : Controller
    {
        private readonly AirBnbDbContext _context;

        public ContactUsController(AirBnbDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<Boolean> PostContactUs(ContactUs contactUs)
        {
            try {
                contactUs.CreatedDate = DateTime.Now;
                _context.ContactUs.Add(contactUs);
                await _context.SaveChangesAsync();

                return true ;
            }

            catch
            {

                return false ;

            }

        }

    }
}
