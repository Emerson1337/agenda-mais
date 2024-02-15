import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOfMongoIds', async: false })
export class IsArrayOfMongoIdsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown) {
    if (!Array.isArray(value)) {
      return false;
    }

    const isValid = value.every((item) => {
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return typeof item === 'string' && objectIdRegex.test(item);
    });

    return isValid;
  }

  defaultMessage() {
    return 'Each element of the array must be a valid MongoDB ObjectId string.';
  }
}

export function IsArrayOfMongoIds(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayOfMongoIdsConstraint,
    });
  };
}
