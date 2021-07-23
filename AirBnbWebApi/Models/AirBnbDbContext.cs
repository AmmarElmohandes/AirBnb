using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirBnbWebApi.Models
{
    public class AirBnbDbContext:DbContext
    {
        public AirBnbDbContext()
        {
        }

        public AirBnbDbContext(DbContextOptions<AirBnbDbContext> options):base(options)
        {

        }
        public virtual DbSet<Host> hosts { get; set; }
        public virtual DbSet<User> users { get; set; }
        public virtual DbSet<Property> properties { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        //public virtual DbSet<PropertyReservation> PropertyReservations { get; set; }
    }
   
}
