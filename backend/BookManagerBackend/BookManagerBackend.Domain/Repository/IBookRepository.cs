using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Domain.Repository
{
    public interface IBookRepository
    {
        Task AddAsync(BookEntity book);
        Task<List<BookEntity>> GetBooksByUserIdAsync(Guid userId);
        Task<BookEntity?> GetBookByIdAsync(Guid bookId, Guid userId);
        void Remove(BookEntity book);
    }
}
