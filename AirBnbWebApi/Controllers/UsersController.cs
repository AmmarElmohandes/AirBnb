using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Cors;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly AirBnbDbContext _context;

        public UsersController(AirBnbDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Getuser(int id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putuser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> Postuser(User user)
        {
            if (userNameExists(user.UserName))
            {
                return BadRequest(error: "UserName already exists");
            }
            else if (userEmailExists(user.Email))
            {
                return BadRequest(error: "Email already exists");
            }
            else if (userPhoneExists(user.PhoneNumber))
            {
                return BadRequest(error: "Phone Number already exists");
            }
            else
            {
                _context.users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Getuser", new { id = user.id }, user);

            }
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteuser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        public async Task<ActionResult<User>> Login(string UserName,string Password)
        {
            var user = await _context.users.FindAsync(UserName, Password);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }





        private bool userExists(int id)
        {
            return _context.users.Any(e => e.id == id);
        }
        private bool userNameExists(string Name)
        {
            return _context.users.Any(e => e.UserName == Name);
        }
        private bool userEmailExists(string Email)
        {
            return _context.users.Any(e => e.Email == Email);
        }
        private bool userPhoneExists(string Phone)
        {
            return _context.users.Any(e => e.PhoneNumber == Phone);
        }





    }
}
