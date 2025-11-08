using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;
using BookManagerBackend.Infrastructure.Auth;
using BookManagerBackend.Infrastructure.Data;
using BookManagerBackend.Infrastructure.Mapping;
using BookManagerBackend.Infrastructure.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
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

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPasswordService, PasswordService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork>(sp =>
                sp.GetRequiredService<BookManagerDbContext>());
            services.AddSingleton<IPasswordHasher<UserEntity>,
                              PasswordHasher<UserEntity>>();
            return services;
        }

    }
}
