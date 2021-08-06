using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Cors;
using AirBnbWebApi.JwtFeatures;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class HostsController : ControllerBase
    {
        private readonly AirBnbDbContext _context;
        private readonly UserManager<Host> _userManager;
        private readonly JwtHandler _jwtHandler;

        public HostsController(AirBnbDbContext context, JwtHandler jwtHandler)
        {
            
            _jwtHandler = jwtHandler;
            _context = context;
        }
       
        // GET: api/Hosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Host>>> Gethosts()
        {
            return await _context.hosts.ToListAsync();
        }

        // GET: api/Hosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Host>> GetHost(int id)
        {
            var host = await _context.hosts.FindAsync(id);

            if (host == null)
            {
                return NotFound();
            }

            return host;
        }

        // PUT: api/Hosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHost(int id, Host host)
        {
            if (id != host.id)
            {
                return BadRequest();
            }

            _context.Entry(host).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HostExists(id))
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

        // POST: api/Hosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Host>> PostHost(Host host)
        {
            if (HostUserNameExists(host.UserName))
            {
                return BadRequest(error: "UserName already exists");
            }
            else if (HostEmailExists(host.Email))
            {
                return BadRequest(error: "Email already exists");
            }
            else if (HostPhoneExists(host.PhoneNumber))
            {
                return BadRequest(error: "Phone Number already exists");
            }
            else if (host.BirthDate.ToString() == null)
            {

                return BadRequest(error: "Date must be given");

            }

            else
            {
                _context.hosts.Add(host);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetHost", new { id = host.id }, host);

            }
        }

        // DELETE: api/Hosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHost(int id)
        {
            var host = await _context.hosts.FindAsync(id);
            if (host == null)
            {
                return NotFound();
            }

            _context.hosts.Remove(host);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginHost userForAuthentication)
        {

           
            var user = await _context.hosts.FirstOrDefaultAsync(a=>a.Email==userForAuthentication.Email && a.Password==userForAuthentication.Password);

            if (user == null )
                return Unauthorized(new AuthResponse { ErrorMessage = "Invalid email or password" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
           
           return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token,Id=user.id });
        }

        private bool HostExists(int id)
        {
            return _context.hosts.Any(e => e.id == id);
        }
        private bool HostUserNameExists(string Name)
        {
            return _context.hosts.Any(e => e.UserName == Name);
        }
        private bool HostEmailExists(string Email)
        {
            return _context.hosts.Any(e => e.Email == Email);
        }
        private bool HostPhoneExists(string Phone)
        {
            return _context.hosts.Any(e => e.PhoneNumber == Phone);
        }
    }
}
