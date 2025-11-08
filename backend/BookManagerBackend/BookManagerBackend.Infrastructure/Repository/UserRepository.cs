using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;
using BookManagerBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookManagerBackend.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly BookManagerDbContext _context;

        public UserRepository(BookManagerDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserEntity user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserEntity?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
