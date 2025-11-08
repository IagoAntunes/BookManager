namespace BookManagerBackend.Application.Service.Interface
{
    public interface IAuthenticatedUserService
    {
        Guid? UserId { get; }
    }
}
