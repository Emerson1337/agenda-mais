import { Coffee } from "../domain/coffee";
import { CoffeeFacade } from "../infrastructure/coffee.facade";

export const fetchCoffeeService = async (): Promise<Array<Coffee>> => {
  return await new CoffeeFacade().fetchAll();
};
