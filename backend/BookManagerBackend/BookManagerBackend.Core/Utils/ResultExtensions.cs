using Microsoft.AspNetCore.Mvc;

namespace BookManagerBackend.Core.Utils
{
    public static class ResultExtensions
    {
        public static TOut Match<TOut>(
            this Result result,
            Func<TOut> onSuccess,
            Func<CustomError, TOut> onFailure)
        {
            return result.IsSuccess ? onSuccess() : onFailure(result.Error);
        }

        public static TOut Match<T, TOut>(
            this Result<T> result,
            Func<T, TOut> onSuccess,
            Func<CustomError, TOut> onFailure)
        {
            return result.IsSuccess ? onSuccess(result.Value!) : onFailure(result.Error);
        }

        public static IActionResult ToActionResult(
            this Result result,
            Func<IActionResult>? onSuccess = null)
        {
            return result.Match(
                onSuccess: onSuccess ?? (() => new NoContentResult()),
                onFailure: error => ToProblem(error)
            );
        }

        public static IActionResult ToActionResult<T>(
            this Result<T> result,
            Func<T, IActionResult>? onSuccess = null)
        {
            return result.Match(
                onSuccess: value => onSuccess?.Invoke(value) ?? new OkObjectResult(value),
                onFailure: error => ToProblem(error)
            );
        }

        // Método auxiliar para criar a resposta de erro padronizada
        private static IActionResult ToProblem(CustomError error)
        {
            var problemDetails = new ProblemDetails
            {
                Title = error.Code,
                Detail = error.Description,
                Status = error.StatusCode
            };

            return new ObjectResult(problemDetails)
            {
                StatusCode = error.StatusCode
            };
        }
    }
}