using BookManagerBackend.Application.DTOs.Book;
using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Core.Utils;
using BookManagerBackend.Domain.Dtos;
using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;

namespace BookManagerBackend.Application.Service.Implementation
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BookService(
            IBookRepository bookRepository,
            IUnitOfWork unitOfWork
        )
        {
            this._bookRepository = bookRepository;
            this._unitOfWork = unitOfWork;
        }

        public async Task<Result> CreateBook(CreateBookRequest request, Guid userId)
        {
            var bookEntity = new BookEntity(
                request.Title,
                request.Author,
                request.ImageUrl, 
                request.StatusId,
                request.Rating,
                request.Review,
                userId
            );

            await _bookRepository.AddAsync(bookEntity);
            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }

        public async Task<Result> UpdateBook(UpdateBookRequest request,Guid bookId, Guid userId)
        {
            var book = await _bookRepository.GetBookByIdAsync(bookId, userId);
            if (book is null)
            {
                return Result.Failure(CustomError.NotFound);
            }
            book.UpdateDetails(
                request.Title,
                request.Author,
                request.ImageUrl,
                request.StatusId,
                request.Rating,
                request.Review
            );
            await _unitOfWork.SaveChangesAsync();
            return Result.Success();
        }

        public async Task<Result> DeleteBook(Guid bookId, Guid userId)
        {
            var book = await _bookRepository.GetBookByIdAsync(bookId, userId);

            if (book is null)
            {
                return Result.Failure(CustomError.NotFound);
            }

            _bookRepository.Remove(book);

            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }

        public async Task<Result<List<BookDto>>> GetBooks(Guid userId)
        {
            var bookEntities = await _bookRepository.GetBooksByUserIdAsync(userId);

            var bookDtos = bookEntities.Select(book => new BookDto(

                book.Id, 
                book.Title,
                book.Author,
                book.ImageUrl,
                book.Rating,
                book.Review,
                new StatusDto(book.Status.Id, book.Status.Title)
            )).ToList();

            return Result<List<BookDto>>.Success(bookDtos);
        }

    }
}
