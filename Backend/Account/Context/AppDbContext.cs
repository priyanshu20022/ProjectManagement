using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AccountEntity> Users { get; set; }
        public DbSet<Project> Projects { get; set; }

    }
}
