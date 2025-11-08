using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Application.Service.Interface
{
    public interface IPasswordService
    {
        string HashPassword(UserEntity user, string password);
        bool VerifyPassword(UserEntity user, string storedHash, string providedPassword);
    }
}
