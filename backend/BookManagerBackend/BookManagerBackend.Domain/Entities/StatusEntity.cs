using BookManagerBackend.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookManagerBackend.Domain.Entities
{
    [Table("Statuses")]
    public class StatusEntity : BaseEntity
    {
        public string Title { get; set; }
    }
}
