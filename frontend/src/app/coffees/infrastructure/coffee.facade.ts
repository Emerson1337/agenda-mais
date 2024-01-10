import { API } from "@services/config/apiConfig";
import { apiUrls } from "@shared/lib/routes/apiUrls";
import { Coffee } from "../domain/coffee";

export class CoffeeFacade {
  async fetchAll(): Promise<Array<Coffee>> {
    return (
      await API.get(apiUrls.coffee.list()).catch(function (error) {
        console.error(Promise.reject(error.response?.data.errors));
        return { data: { body: [] } };
      })
    )?.data.body;
  }
}
