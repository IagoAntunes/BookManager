using BookManagerBackend.Domain.Entities;

namespace BookManagerBackend.Domain.Repository
{
    public interface IUserRepository
    {
        /// <summary>
        /// Busca um usuário pelo seu e-mail.
        /// </summary>
        Task<UserEntity?> GetByEmailAsync(string email);

        /// <summary>
        /// Busca um usuário pelo seu ID.
        /// </summary>
        Task<UserEntity?> GetByIdAsync(Guid id);

        /// <summary>
        /// Adiciona um novo usuário ao contexto (não salva no banco).
        /// </summary>
        Task AddAsync(UserEntity user);
    }
}
