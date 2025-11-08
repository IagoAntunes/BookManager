using BookManagerBackend.Application.DTOs.Auth;
using FluentValidation;

namespace BookManagerBackend.Application.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Por favor, informe um e-mail válido.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8)
                .WithMessage("A senha deve ter no mínimo 8 caracteres.");
        }
    }
}
