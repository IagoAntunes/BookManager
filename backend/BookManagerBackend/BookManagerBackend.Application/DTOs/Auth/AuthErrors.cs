using BookManagerBackend.Core.Utils;

namespace BookManagerBackend.Application.DTOs.Auth
{
    public class AuthErrors
    {
        public static readonly CustomError EmailInUse = new CustomError(
            "Auth.EmailInUse",
            "The provided email is already in use.",
            400
        );
        public static readonly CustomError InvalidCredentials = new CustomError(
            "InvalidCredentials",
            "The credentials are wrong",
            401
        );
    }
}
