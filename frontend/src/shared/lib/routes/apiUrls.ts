export const apiUrls = {
  coffee: {
    create: (): string => `/coffee`,
    list: (): string => `/coffees`,
  },
  tea: {
    create: (): string => `/tea`,
    list: (): string => `/teas`,
  },
};
