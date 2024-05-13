export const apiUrls = {
  appointment: {
    getAll: (): string => `/api/appointment`,
  },
  schedule: {
    create: (): string => `/api/dashboard/agendas`,
    get: (): string => `/api/dashboard/agendas`,
  },
};
