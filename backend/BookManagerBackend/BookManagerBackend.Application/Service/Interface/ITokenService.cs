using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Application.Service.Interface
{
    public interface ITokenService
    {
        string GenerateToken(UserEntity user);
    }
}
