using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirBnbWebApi.Models;
using System.IO;
using System.Net.Http.Headers;

namespace AirBnbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly AirBnbDbContext _context;

        public PhotosController(AirBnbDbContext context)
        {
            _context = context;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photos>>> GetPhotos()
        {
            return await _context.Photos.ToListAsync();
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Photos>>> GetPhotos(int id)
        {

            var photos= await _context.Photos.Where(a=>a.PropertyId==id).ToListAsync();
            if (photos == null)
            {
                return NotFound();

            }
            return photos;

            
        }


        // PUT: api/Photos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhotos(int id, Photos photos)
        {
            if (id != photos.id)
            {
                return BadRequest();
            }

            _context.Entry(photos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotosExists(id))
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

        // POST: api/Photos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Photos>> PostPhotos(Photos photos)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fullPath = Path.Combine(pathToSave, photos.ImageName);
            var dbPath = Path.Combine(folderName, photos.ImageName);
            photos.ImageName = fullPath;
            _context.Photos.Add(photos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhotos", new { id = photos.id }, photos);
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotos(int id)
        {
            var photos = await _context.Photos.FindAsync(id);
            if (photos == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(photos);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("Upload"), DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                   // return Ok("loloo");
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        private bool PhotosExists(int id)
        {
            return _context.Photos.Any(e => e.id == id);
        }
    }
}
