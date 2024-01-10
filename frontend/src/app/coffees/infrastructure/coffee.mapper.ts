import { apiAddress } from "@shared/contants/apiAddresses";
import { Coffee } from "../domain/coffee";

export const CoffeeMapper = {
  toDomain: (data: Coffee): Coffee =>
    new Coffee({
      name: data.name,
      type: data.type,
      description: data.description,
      picture: `${process.env.REACT_APP_BASE_URL || apiAddress}/${
        data.picture
      }`,
    }),
};
