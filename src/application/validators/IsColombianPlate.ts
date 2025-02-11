import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function IsColombianPlate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isColombianPlate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== "string") return false;

          const privatePublicRegex = /^[A-Z]{3}-\d{3}$/;
          const motorcycleRegex = /^[A-Z]{3}\d{2}[A-Z]$/;

          return privatePublicRegex.test(value) || motorcycleRegex.test(value);
        },
        defaultMessage(): string {
          return "Invalid Colombian license plate format. Expected 'AAA-123' or 'AAA12B'.";
        },
      },
    });
  };
}
