using BookManagerBackend.Application.Mapping;
using Microsoft.Extensions.DependencyInjection;

namespace BookManagerBackend.Application
{
    public static class ApplicationRegistration
    {
        public static IServiceCollection AddApplicationRegistration(
            this IServiceCollection services    
        )
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<RequestToDtoMapper>();
            });
            return services;
        }

    }
}
