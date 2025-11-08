namespace BookManagerBackend.Domain.Repository
{
    public interface IUnitOfWork
    {
        /// <summary>
        /// Salva todas as mudanças rastreadas no banco de dados.
        /// </summary>
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
