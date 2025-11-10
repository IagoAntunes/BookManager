namespace BookManagerBackend.Application.DTOs.Book
{
    public record CreateBookRequest(string Title, string Author, string ImageUrl, Guid StatusId, int Rating, string Review);
}
