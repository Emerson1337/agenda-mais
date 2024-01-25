type UnknownObject = Record<any, any>;

export const removeAttributes = <T extends UnknownObject>(
  object: T,
  attributes: Array<keyof T>,
): T => {
  let objectWithUndefined = {};

  attributes.map(
    (attribute) =>
      (objectWithUndefined = {
        ...objectWithUndefined,
        [attribute]: undefined,
      }),
  );

  return Object.assign({}, object, objectWithUndefined) as T;
};
