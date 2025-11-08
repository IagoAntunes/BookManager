using BookManagerBackend.Application.DTOs.Auth;
using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Core.Utils;
using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;

namespace BookManagerBackend.Application.Service.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordService _passwordService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork; 

        public AuthService(
            IUserRepository userRepository,
            IPasswordService passwordService,
            ITokenService tokenService,
            IUnitOfWork unitOfWork
        ) 
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork; 
        }

        public async Task<Result<LoginResponse>> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return Result<LoginResponse>.Failure(AuthErrors.InvalidCredentials);
            }

            var passwordIsValid = _passwordService.VerifyPassword(
                user,
                user.PasswordHash,
                request.Password);

            if (!passwordIsValid)
            {
                return Result<LoginResponse>.Failure(AuthErrors.InvalidCredentials);
            }

            var token = _tokenService.GenerateToken(user);

            var response = new LoginResponse(token, user.Email);
            return Result<LoginResponse>.Success(response);
        }

        public async Task<Result> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return Result.Failure(AuthErrors.EmailInUse);
            }

            var passwordHash = _passwordService.HashPassword(null, request.Password);
            var user = new UserEntity(request.Email, passwordHash);

            await _userRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }
    }
}
