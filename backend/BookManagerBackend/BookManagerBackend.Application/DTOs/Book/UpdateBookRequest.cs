namespace BookManagerBackend.Application.DTOs.Book
{
    public record UpdateBookRequest(string Title, string Author, string ImageUrl, Guid StatusId, int Rating, string Review);
}
