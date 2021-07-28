using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirBnbWebApi.Models;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestsController : ControllerBase
    {
        private readonly AirBnbDbContext _context;

        public GuestsController(AirBnbDbContext context)
        {
            _context = context;
        }

        // GET: api/Guests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Guests>>> GetGuests()
        {
            return await _context.Guests.ToListAsync();
        }

        // GET: api/Guests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Guests>> GetGuests(int id)
        {
            var guests = await _context.Guests.FindAsync(id);

            if (guests == null)
            {
                return NotFound();
            }

            return guests;
        }

        // PUT: api/Guests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuests(int id, Guests guests)
        {
            if (id != guests.id)
            {
                return BadRequest();
            }

            _context.Entry(guests).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestsExists(id))
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

        // POST: api/Guests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Guests>> PostGuests(Guests guests)
        {
            _context.Guests.Add(guests);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGuests", new { id = guests.id }, guests);
        }

        // DELETE: api/Guests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuests(int id)
        {
            var guests = await _context.Guests.FindAsync(id);
            if (guests == null)
            {
                return NotFound();
            }

            _context.Guests.Remove(guests);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GuestsExists(int id)
        {
            return _context.Guests.Any(e => e.id == id);
        }
    }
}
