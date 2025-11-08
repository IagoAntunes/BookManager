namespace BookManagerBackend.Core.Utils
{
    public class Result
    {
        protected Result(bool isSuccess, CustomError error)
        {
            if ((isSuccess && error != CustomError.None) || (!isSuccess && error == CustomError.None))
                throw new ArgumentException("Invalid error", nameof(error));

            IsSuccess = isSuccess;
            Error = error;
        }

        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public CustomError Error { get; }

        public static Result Success() => new(true, CustomError.None);
        public static Result Failure(CustomError error) => new(false, error);
    }

    /// <summary>
    /// Representa o resultado de uma operação com um valor de retorno.
    /// </summary>
    /// <typeparam name="T">O tipo do valor de retorno</typeparam>
    public class Result<T> : Result 
    {
        private Result(bool isSuccess, T? value, CustomError error)
            : base(isSuccess, error) 
        {
            Value = value;
        }

        public T? Value { get; }

        // Usamos 'new' para "esconder" o método base e retornar o tipo correto (Result<T>)
        public static new Result<T> Success(T value) => new(true, value, CustomError.None);

        // Usamos 'new' para "esconder" o método base e retornar o tipo correto (Result<T>)
        public static new Result<T> Failure(CustomError error) => new(false, default, error);

        // Permite retornos implícitos (ex: return T; em vez de return Result<T>.Success(T);)
        public static implicit operator Result<T>(T value) => Success(value);
    }

}
