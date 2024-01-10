import { API } from "../../../services/config/apiConfig";
import { apiUrls } from "../../../shared/lib/routes/apiUrls";
import { Tea } from "../domain/tea";

export class TeaFacade {
  async fetchAll(): Promise<Array<Tea>> {
    return (
      await API.get(apiUrls.tea.list()).catch(function (error) {
        console.error(Promise.reject(error.response?.data.errors));
        return { data: { body: [] } };
      })
    )?.data.body;
  }
}
