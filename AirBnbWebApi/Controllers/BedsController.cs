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
    public class BedsController : ControllerBase
    {
        private readonly AirBnbDbContext _context;

        public BedsController(AirBnbDbContext context)
        {
            _context = context;
        }

        // GET: api/Beds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beds>>> GetBeds()
        {
            return await _context.Beds.ToListAsync();
        }

        // GET: api/Beds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Beds>> GetBeds(int id)
        {
            var beds = await _context.Beds.FirstOrDefaultAsync(a=>a.PropertyId==id);

            if (beds == null)
            {
                return NotFound();
            }

            return beds;
        }
      

        // PUT: api/Beds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeds(int id, Beds beds)
        {
            if (id != beds.id)
            {
                return BadRequest();
            }

            _context.Entry(beds).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedsExists(id))
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
            _context.properties.Find(beds.PropertyId).Beds = beds;            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeds", new { id = beds.id }, beds);
        }

        // DELETE: api/Beds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeds(int id)
        {
            var beds = await _context.Beds.FindAsync(id);
            if (beds == null)
            {
                return NotFound();
            }

            _context.Beds.Remove(beds);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BedsExists(int id)
        {
            return _context.Beds.Any(e => e.id == id);
        }
    }
}
