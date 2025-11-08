using BookManagerBackend.Infrastructure.Data;
using BookManagerBackend.Infrastructure.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace BookManagerBackend.Infrastructure
{
    public static class InfrastructureRegistration
    {

        public static IServiceCollection AddInfrastructureServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.AddDbContext<BookManagerDbContext>(
                options => options.UseSqlServer(
                    configuration.GetConnectionString("BookManagerConnectionString")
                )
            );
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<DtoToEntityMapper>();
            });
            return services;
        }

    }
}
