export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: any
  ) {
    super(message);
  }

  static fromValidationErrors(errors: any[]) {
    const formattedErrors = errors.map((error) => ({
      field: error.property,
      errors: Object.values(error.constraints || {}),
    }));

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
