using BookManagerBackend.Application.DTOs.Auth;
using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Core.Utils;
using Microsoft.AspNetCore.Mvc;

namespace BookManagerBackend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            return result.ToActionResult();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            return result.ToActionResult();
        }
    }
}
