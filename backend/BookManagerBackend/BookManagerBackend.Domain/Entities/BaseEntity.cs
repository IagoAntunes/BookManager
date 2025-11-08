using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookManagerBackend.Core.Entities
{
    public abstract class BaseEntity
    {
        // 1. Identificação (PK)
        [Key]
        public Guid Id { get; protected set; }

        // 2. Auditoria de Data (Quando?)
        public DateTime CreatedAt { get; protected set; }
        public DateTime? UpdatedAt { get; protected set; }

        // 3. Auditoria de Usuário (Quem?)
        public Guid? CreatedByUserId { get; protected set; }
        public Guid? UpdatedByUserId { get; protected set; }

        // 4. Soft Delete
        public bool IsDeleted { get; protected set; }
        public DateTime? DeletedAt { get; protected set; }

        // 5. Controle de Concorrência
        [Timestamp]
        public byte[] RowVersion { get; set; }

        // 6. Eventos de Domínio (Domain Events)
        //private readonly List<object> _domainEvents = new();
        //public IReadOnlyCollection<object> DomainEvents => _domainEvents.AsReadOnly();
        //public void AddDomainEvent(object domainEvent) => _domainEvents.Add(domainEvent);
        //public void ClearDomainEvents() => _domainEvents.Clear();

        protected BaseEntity()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            IsDeleted = false;
        }

        /// <summary>
        /// Método chamado pelo DbContext ao CRIAR uma entidade
        /// </summary>
        public virtual void SetAuditOnCreate(Guid? createdByUserId)
        {
            // CreatedAt já foi definido no construtor
            CreatedByUserId = createdByUserId;
        }

        /// <summary>
        /// Método chamado pelo DbContext ao MODIFICAR uma entidade
        /// </summary>
        public virtual void SetAuditOnUpdate(Guid? updatedByUserId)
        {
            // O método SetModified() já deve ter sido chamado (na entidade)
            // para atualizar o UpdatedAt. Aqui só setamos o usuário.
            UpdatedByUserId = updatedByUserId;
        }


        public virtual void SetModified()
        {
            UpdatedAt = DateTime.UtcNow;
        }

        public virtual void Delete()
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
        }

        public virtual void Restore()
        {
            IsDeleted = false;
            DeletedAt = null;
        }
    }
}