import {
  InternalServerErrorException,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

import { errorCodes } from '../error-codes';

type InvidivualErrorConstraint = {
  name: string;
  stack: string;
  message: string | { [type: string]: string };
};

type ErrorConstraint = {
  errors: InvidivualErrorConstraint[];
};

type NestedObject = ErrorConstraint | undefined;

export const classValidatorExceptionFactory = (errors: ValidationError[]) => {
  try {
    const allErrorsArray = getAllErrorsKey(errors);
    return new UnprocessableEntityException({ body: allErrorsArray });
  } catch (error) {
    return new InternalServerErrorException();
  }
};

function getAllErrorsKey(errors: ValidationError[]): NestedObject {
  let paths: ErrorConstraint = {
    errors: [],
  };

  function trackAttributesErrorPathRecursively(
    children: ValidationError[],
    errorPath = '',
  ) {
    return children.map((json) => {
      if (!json.property) {
        throw new Error();
      }

      //end of nested objects
      if (json.children && !json.children.length) {
        paths = nestObjects({
          paths,
          errorPath: json.property,
          message: json.constraints,
        });
        console.log(json.property);

        return;
      }

      trackAttributesErrorPathRecursively(json.children ?? [], errorPath);
    });
  }

  trackAttributesErrorPathRecursively(errors);

  return paths;
}

function nestObjects({
  paths,
  errorPath,
  message,
}: {
  paths: ErrorConstraint;
  errorPath: string;
  message:
    | {
        [type: string]: string;
      }
    | undefined;
}): ErrorConstraint {
  try {
    paths.errors.push({
      name: errorPath,
      message:
        typeof message === 'string' || message === undefined
          ? message
          : Object.values(message)[0],
      stack: errorCodes.INVALID_PARAM_ERROR,
    });
  } catch (error) {
    console.error(error);
  }

  return paths;
}
