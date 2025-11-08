using BookManagerBackend.Application.Service.Interface;
using BookManagerBackend.Core.Entities;
using BookManagerBackend.Domain.Entities;
using BookManagerBackend.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Linq.Expressions;

namespace BookManagerBackend.Infrastructure.Data
{
    public class BookManagerDbContext : DbContext, IUnitOfWork
    {
        private readonly IAuthenticatedUserService _authUserService;

        public DbSet<BookEntity> Books { get; set; }
        public DbSet<StatusEntity> Statuses { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        public BookManagerDbContext(
                    DbContextOptions<BookManagerDbContext> options,
                    IAuthenticatedUserService authUserService) : base(options)
        {
            _authUserService = authUserService;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                    {
                        var parameter = Expression.Parameter(entityType.ClrType, "e");
                        var property = Expression.Property(parameter, nameof(BaseEntity.IsDeleted));
                        var constant = Expression.Constant(false);
                        var body = Expression.Equal(property, constant);
                        var lambda = Expression.Lambda(body, parameter);
                        modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                    }
                }

            }
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditFields();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            UpdateAuditFields();
            return base.SaveChanges();
        }

        private void UpdateAuditFields()
        {
            var userId = _authUserService.UserId;

            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.SetAuditOnCreate(userId);
                        break;

                    case EntityState.Modified:
                        entry.Entity.SetAuditOnUpdate(userId);
                        break;
                }
            }
        }

    }
}
