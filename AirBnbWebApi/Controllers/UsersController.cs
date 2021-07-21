using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirBnbWebApi.Models;
using AirBnbWebApi.JwtFeatures;
using System.IdentityModel.Tokens.Jwt;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AirBnbDbContext _context;
        private readonly JwtHandler _jwtHandler;

        public UsersController(AirBnbDbContext context,JwtHandler jwtHandler)
        {
            _context = context;
            _jwtHandler = jwtHandler;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
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
                if (!UserExists(id))
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

        // POST: api/Users
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

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
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
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginHost userForAuthentication)
        {


            var user = await _context.users.FirstOrDefaultAsync(a => a.Email == userForAuthentication.Email && a.Password == userForAuthentication.Password);

            if (user == null)
                return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token, Id = user.id });
        }

        private bool UserExists(int id)
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
