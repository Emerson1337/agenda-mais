import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayTimeFormat', async: false })
class IsArrayTimeFormatConstraint implements ValidatorConstraintInterface {
  validate(values: string[]) {
    if (typeof values !== 'object') {
      return false;
    }

    return values.every((value) => {
      const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(value);
    });
  }

  defaultMessage() {
    return 'Time must be in the HH:mm (24-hour) format';
  }
}

export function IsArrayTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayTimeFormatConstraint,
    });
  };
}
