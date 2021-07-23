using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Controllers
{
    public class BedsController : Controller
    {
        private readonly AirBnbDbContext _context;

        public BedsController(AirBnbDbContext context)
        {

            _context = context;
        }

        // GET: api/Beds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beds>>> GetBedsForProperty(int PropertyId)
        {
            return await _context.Beds.Where(x=>x.Propety.id==PropertyId).ToListAsync();
        }


        // PUT: api/Beds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBed(Beds beds)
        {

            _context.Entry(beds).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedsExists(beds.id))
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

        // POST: api/Beds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Beds>> PostBeds(Beds beds)
        {
            
                _context.Beds.Add(beds);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBedsForProperty", new { id = beds.id }, beds);

           
        }

        // DELETE: api/Beds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeds(int id)
        {
            var Beds = await _context.Beds.FindAsync(id);
            if (Beds == null)
            {
                return NotFound();
            }

            _context.Beds.Remove(Beds);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        


        private bool BedsExists(int id)
        {
            return _context.Beds.Any(e => e.id == id);
        }

    }
}
