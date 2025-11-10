using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;
using BookManagerBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BookManagerBackend.Infrastructure.Repository
{
    public class BookRepository : IBookRepository
    {

        private readonly BookManagerDbContext _context;

        public BookRepository(BookManagerDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(BookEntity book)
        {
            await _context.Books.AddAsync(book);
        }

        public async Task<BookEntity?> GetBookByIdAsync(Guid bookId, Guid userId)
        {
            return await _context.Books
                           .FirstOrDefaultAsync(b => b.Id == bookId && b.UserId == userId);
        }

        public async Task<List<BookEntity>> GetBooksByUserIdAsync(Guid userId)
        {
            return await _context.Books
                .Include(b => b.Status)
                .Where(b => b.UserId == userId)
                .ToListAsync(); 
        }

        public void Remove(BookEntity book)
        {
            _context.Books.Remove(book);
        }
    }
}
