export const apiUrls = {
  public: {
    appointment: {
      cancel: ({
        username,
        code,
        phone,
      }: {
        username: string;
        code: string;
        phone: string;
      }): string => `/api/${username}/cancelar-agendamento/${code}/${phone}`,
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
    auth: {
      login: (): string => `/api/auth/login`,
      verifyToken: (): string => `/api/auth/verify-token`,
      signUp: (): string => `/api/auth/cadastrar`,
      refreshToken: (): string => `/api/auth/refresh-token`,
      resetPassword: (): string => `/api/auth/resetar-senha`,
      forgotPassword: (): string => `/api/auth/esqueci-senha`,
    },
    schedule: {
      create: (): string => `/api/dashboard/agendas`,
      get: (): string => `/api/dashboard/agendas`,
    },
    appointment: {
      getAll: (): string => `/api/dashboard/agendas/agendamentos`,
      cancel: (): string => `/api/dashboard/agendas/cancelar-agendamento`,
    },
    service: {
      getAll: (): string => `/api/dashboard/servicos`,
      update: (id: string): string => `/api/dashboard/servicos/${id}`,
      create: (): string => `/api/dashboard/servicos`,
      cancel: (id: string): string => `/api/dashboard/servicos/${id}`,
    },
    me: {
      get: (): string => `/api/dashboard/usuarios/me`,
      put: (): string => `/api/dashboard/usuarios`,
      patch: (): string => `/api/dashboard/usuarios/foto`,
      changePassword: (): string => `/api/dashboard/usuarios/atualizar-senha`,
    },
    reports: {
      getTotalMetrics: (): string => `/api/dashboard/relatorios/total`,
      getMonthlyMetrics: (date: string): string =>
        `/api/dashboard/relatorios/mensal/${date}`,
      getYearlyMetrics: (): string => `/api/dashboard/relatorios/anual`,
    },
  },
};
