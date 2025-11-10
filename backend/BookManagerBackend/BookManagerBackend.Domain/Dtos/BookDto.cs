using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Domain.Dtos
{
    public record BookDto(
            Guid Id,
            string Title,
            string Author,
            string ImageUrl,
            int Rating,
            string Review,
            StatusDto Status
        );
}
