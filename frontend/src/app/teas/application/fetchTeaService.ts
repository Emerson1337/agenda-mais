import { Tea } from "../domain/tea";
import { TeaFacade } from "../infrastructure/tea.facade";

export const fetchTeaService = async (): Promise<Array<Tea>> => {
  return await new TeaFacade().fetchAll();
};
