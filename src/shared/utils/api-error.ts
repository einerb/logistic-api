export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: any
  ) {
    super(message);
  }

  static fromValidationErrors(errors: any[]) {
    const formatError = (error: any, parentField = "") => {
      const field = parentField
        ? `${parentField}.${error.property}`
        : error.property;

      if (error.children && error.children.length > 0) {
        return error.children.flatMap((child: any) =>
          formatError(child, field)
        );
      }

      return {
        field,
        errors: Object.values(error.constraints || {}),
      };
    };

    const formattedErrors = errors.flatMap((error) => formatError(error));

    return new ApiError(400, "Validation errors", formattedErrors);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.error,
    };
  }
}
