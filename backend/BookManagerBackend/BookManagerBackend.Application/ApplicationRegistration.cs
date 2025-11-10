using BookManagerBackend.Application.Mapping;
using BookManagerBackend.Application.Service.Implementation;
using BookManagerBackend.Application.Service.Interface;
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

            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IBookService, BookService>();
            return services;
        }

    }
}
