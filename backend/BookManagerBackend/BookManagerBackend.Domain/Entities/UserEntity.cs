using BookManagerBackend.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookManagerBackend.Domain.Entities
{
    [Table("Users")]
    public class UserEntity : BaseEntity
    {
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }

        private UserEntity() { }

        public UserEntity(string email, string passwordHash)
        {
            Email = email;
            PasswordHash = passwordHash;
        }
    }
}
