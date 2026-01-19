using Azure.Core;
using BookManagerBackend.Application.DTOs.Book;
using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Core.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookManagerBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }


        [HttpPost()]
        public async Task<IActionResult> CreateBook([FromBody] CreateBookRequest request)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized();
            }
            var result =  await _bookService.CreateBook(request, Guid.Parse(userIdString));
            return result.ToActionResult();
        }

        [HttpPut("{bookId}")]
        public async Task<IActionResult> UpdateBook([FromBody] UpdateBookRequest request, [FromRoute] string bookId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized();
            }
            if (!Guid.TryParse(bookId, out Guid bookGuid))
            {
                return BadRequest("Invalid book ID format.");
            }
            var result = await _bookService.UpdateBook(request, Guid.Parse(bookId), Guid.Parse(userIdString));
            return result.ToActionResult();
        }


        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized();
            }
            var result = await _bookService.GetBooks(Guid.Parse(userIdString));
            return result.ToActionResult();
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> DeleteBook([FromRoute] Guid bookId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized();
            }
            var result = await _bookService.DeleteBook(bookId, Guid.Parse(userIdString));
            return result.ToActionResult();
        }

    }
}
