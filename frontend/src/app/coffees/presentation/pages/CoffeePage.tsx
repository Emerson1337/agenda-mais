import React from "react";
import { Coffee } from "../../domain/coffee";
import { Product } from "@app/interface/presentation/components/Product";

type Props = {
  data: Coffee[];
};

export const CoffeePage: React.FC<Props> = ({ data }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl mb-4 title-products-list">Our beloved coffee</h1>
      <p className="mb-10">
        Hand-picked, made with love, curated, call it what you want. But we
        promise you, this will be the best coffe of your life.
      </p>
      <div className="coffees">
        {data.length ? (
          data.map((coffee, key) => (
            <Product
              key={key}
              productName={coffee.name}
              productType={coffee.type}
              productPhoto={coffee.picture}
            />
          ))
        ) : (
          <h1>No coffees found!</h1>
        )}
      </div>
    </div>
  );
};
