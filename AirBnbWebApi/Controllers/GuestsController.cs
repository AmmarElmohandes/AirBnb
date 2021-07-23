using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Controllers
{
    public class GuestsController : Controller
    {

        private readonly AirBnbDbContext _context;

        public GuestsController(AirBnbDbContext context)
        {

            _context = context;
        }

        // GET: api/Guests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Guests>>> GetGuestsForProperty(int PropertyId)
        {
            return await _context.Guests.Where(x => x.Propety.id == PropertyId).ToListAsync();
        }


        // PUT: api/Guests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuests(Guests guests)
        {

            _context.Entry(guests).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestsExists(guests.id))
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

            return CreatedAtAction("GetGuestsForProperty", new { id = guests.id }, guests);


        }

        // DELETE: api/Guests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuests(int id)
        {
            var Guests = await _context.Guests.FindAsync(id);
            if (Guests == null)
            {
                return NotFound();
            }

            _context.Guests.Remove(Guests);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool GuestsExists(int id)
        {
            return _context.Guests.Any(e => e.id == id);
        }

    }
}
