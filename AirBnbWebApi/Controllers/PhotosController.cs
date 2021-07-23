using AirBnbWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Controllers
{
    public class PhotosController : Controller
    {
        private readonly AirBnbDbContext _context;

        public PhotosController(AirBnbDbContext context)
        {

            _context = context;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photos>>> GetAllPhotosForProperty(int PropertyId)
        {
            return await _context.Photos.Where(x => x.Propety.id == PropertyId).ToListAsync();
        }


        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<Photos>> GetPhotoForProperty(int PropertyId)
        {
            return await _context.Photos.Where(x => x.Propety.id == PropertyId).FirstOrDefaultAsync();
        }



        // POST: api/Photos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Photos>> PostPhotos(Photos photos)
        {

            _context.Photos.Add(photos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhotosForProperty", new { id = photos.id }, photos);


        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotos(int id)
        {
            var Photos = await _context.Photos.FindAsync(id);
            if (Photos == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(Photos);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool PhotosExists(int id)
        {
            return _context.Photos.Any(e => e.id == id);
        }

    }
}
