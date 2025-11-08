using BookManagerBackend.Application.DTOs.Auth;
using BookManagerBackend.Core.Utils;

namespace BookManagerBackend.Application.Service.Interface
{
    public interface IAuthService
    {
        public Task<Result> RegisterAsync(RegisterRequest request);
        public Task<Result<LoginResponse>> LoginAsync(LoginRequest request);

    }
}
