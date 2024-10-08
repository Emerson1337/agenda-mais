export const apiUrls = {
  public: {
    appointment: {
      cancel: ({
        username,
        code,
      }: {
        username: string;
        code: string;
      }): string => `/api/${username}/cancelar-agendamento/${code}`,
      book: (username: string): string => `/api/${username}/agendamentos`,
    },
    business: {
      get: (username: string): string => `/api/${username}`,
    },
    availableTimes: {
      get: (username: string): string => `/api/${username}/horarios`,
    },
    history: {
      get: ({ username, phone }: { phone: string; username: string }): string =>
        `/api/${username}/historico/${phone}`,
    },
  },
  internal: {
    schedule: {
      create: (): string => `/api/dashboard/agendas`,
      get: (): string => `/api/dashboard/agendas`,
    },
    appointment: {
      getAll: (): string => `/api/dashboard/agendas/agendamentos`,
      cancel: (): string => `/api/dashboard/agendas/cancelar-agendamento`,
    },
    me: {
      get: (): string => `/api/dashboard/usuarios/me`,
    },
  },
};
