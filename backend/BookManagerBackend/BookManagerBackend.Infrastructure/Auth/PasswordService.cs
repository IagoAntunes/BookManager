using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BookManagerBackend.Infrastructure.Auth
{
    public class PasswordService : IPasswordService
    {
        private readonly IPasswordHasher<UserEntity> _passwordHasher;

        public PasswordService(IPasswordHasher<UserEntity> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

        public string HashPassword(UserEntity user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(UserEntity user, string storedHash, string providedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, storedHash, providedPassword);
            return result != PasswordVerificationResult.Failed;
        }
    }
}
