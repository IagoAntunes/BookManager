using BookManagerBackend.Application.Service.Interface;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace BookManagerBackend.Application.Service.Implementation
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid? UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User
                                                      ?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (Guid.TryParse(userIdClaim, out Guid userId))
                {
                    return userId;
                }

                // Retorna nulo se não houver usuário logado (ex: seed, testes)
                return null;
            }
        }
    }
}
