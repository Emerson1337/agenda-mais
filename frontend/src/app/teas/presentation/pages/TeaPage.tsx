import React from "react";
import { Tea } from "@app/teas/domain/tea";
import { Product } from "@app/interface/presentation/components/Product";

type Props = {
  data: Tea[];
};

export const TeaPage: React.FC<Props> = ({ data }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl mb-4 title-products-list">
        Just you, hot water and our tea
      </h1>
      <p className="mb-10">No pesticies or artificial flavours. We promise!</p>
      <div className="products">
        {data.length ? (
          data.map((tea, key) => (
            <Product
              key={key}
              productName={tea.name}
              productPhoto={tea.picture}
            />
          ))
        ) : (
          <h1>No teas found!</h1>
        )}
      </div>
    </div>
  );
};
