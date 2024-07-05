export const apiUrls = {
  appointment: {
    getAll: (): string => `/api/appointment`,
  },
  schedule: {
    create: (): string => `/api/dashboard/agendas`,
    get: (): string => `/api/dashboard/agendas`,
  },
  business: {
    get: (username: string): string => `/api/${username}`,
  },
  availableTimes: {
    get: (username: string): string => `/api/${username}/horarios`,
  },
};
