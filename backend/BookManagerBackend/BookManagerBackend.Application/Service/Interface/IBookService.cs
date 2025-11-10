using BookManagerBackend.Application.DTOs.Book;
using BookManagerBackend.Core.Utils;
using BookManagerBackend.Domain.Dtos;
using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Application.Service.Interface
{
    public interface IBookService
    {
        public Task<Result> CreateBook(CreateBookRequest request, Guid UserId);
        public Task<Result> UpdateBook(UpdateBookRequest request,Guid bookId, Guid userId);
        public Task<Result<List<BookDto>>> GetBooks(Guid UserId);
        public Task<Result> DeleteBook(Guid BookId, Guid UserId);
    }
}
