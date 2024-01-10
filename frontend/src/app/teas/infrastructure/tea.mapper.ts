import { apiAddress } from "@shared/contants/apiAddresses";
import { Tea } from "@app/teas/domain/tea";

export const TeaMapper = {
  toDomain: (data: Tea): Tea =>
    new Tea({
      name: data.name,
      description: data.description || "",
      picture: `${process.env.REACT_APP_BASE_URL || apiAddress}/${
        data.picture
      }`,
    }),
};
