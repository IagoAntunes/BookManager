using Microsoft.EntityFrameworkCore;

namespace BookManagerBackend.Infrastructure.Data
{
    public class BookManagerDbContext : DbContext
    {

        public BookManagerDbContext(DbContextOptions<BookManagerDbContext> dbOptions) : base(dbOptions)
        {
            
        }

    }
}
