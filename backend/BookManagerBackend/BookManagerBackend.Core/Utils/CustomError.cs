using Microsoft.AspNetCore.Http;

namespace BookManagerBackend.Core.Utils
{
    public readonly record struct CustomError(string Code, string Description, int StatusCode = StatusCodes.Status400BadRequest)
    {
        public static readonly CustomError None = new("", "", StatusCodes.Status200OK);
        public static readonly CustomError BadRequest = new(
            "bad_request",
            "",
            StatusCodes.Status400BadRequest);
        public static readonly CustomError NotFound = new(
            "not_found",
            "O recurso solicitado não foi encontrado.",
            StatusCodes.Status404NotFound);

        public static readonly CustomError InvalidObjectId = new(
            "invalid_object_id",
            "O id informado não é válido para o MongoDB.",
            StatusCodes.Status400BadRequest);

        public static readonly CustomError DuplicateTicket = new(
            "duplicate_ticket",
            "Já existe um ticket para essa categoria.",
            StatusCodes.Status409Conflict);

        public static readonly CustomError Unauthorized = new(
            "unauthorized",
            "Usuário não autorizado.",
            StatusCodes.Status401Unauthorized);

        public static CustomError Custom(string code, string description, int statusCode = StatusCodes.Status400BadRequest)
            => new(code, description, statusCode);
    }
}
