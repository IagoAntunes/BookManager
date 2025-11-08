using BookManagerBackend.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookManagerBackend.Domain.Entities
{
    [Table("Books")]
    public class BookEntity : BaseEntity
    {

        public string Title { get; private set; }
        public string Author { get; private set; }
        public string ImageUrl { get; private set; }
        public Guid StatusId { get; private set; }
        public int Rating { get; private set; }
        public string Review { get; private set; }


        public StatusEntity Status { get; private set; }

    }
}
