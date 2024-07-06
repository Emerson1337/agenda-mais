export const apiUrls = {
  appointment: {
    getAll: (): string => `/api/dashboard/agendas/agendamentos`,
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
