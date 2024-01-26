import {
  InternalServerErrorException,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

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

      errorPath = pushKeyVisited(errorPath, json.property);

      //end of nested objects
      if (json.children && !json.children.length) {
        paths = nestObjects({ paths, errorPath, message: json.constraints });
        errorPath = removeLastKeyVisited(errorPath, json.property);
        return;
      }

      trackAttributesErrorPathRecursively(json.children ?? [], errorPath);

      errorPath = removeLastKeyVisited(errorPath, json.property);
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
      name: errorPath.replace(/^data\./, ''),
      message:
        typeof message === 'string' || message === undefined
          ? message
          : Object.values(message)[0],
      stack: 'test',
    });
  } catch (error) {
    console.log(error);
  }

  return paths;
}

function removeLastKeyVisited(errorPath: string, lastKeyVisited: string) {
  return errorPath.replace(`.${lastKeyVisited}`, '');
}

function pushKeyVisited(errorPath: string, keyVisited: string) {
  return `${errorPath.length ? errorPath + '.' + keyVisited : keyVisited}`;
}
