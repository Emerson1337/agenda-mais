import Image from "next/dist/client/image";
import React from "react";

type Props = {
  productPhoto: string;
  productName: string;
  productType?: "ROBUSTA" | "ARABIC";
};

export const Product: React.FC<Props> = ({
  productPhoto,
  productName,
  productType,
}) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <Image
          layout="fixed"
          src={productPhoto}
          width={230}
          height={230}
          alt="product-photo"
        />
      </div>
      <div className="card-body">
        <div className="product-name">{productName}</div>
        {productType && (
          <div
            className={`product-type ${
              productType == "ARABIC" ? "red-color" : ""
            }`}
          >
            {productType}
          </div>
        )}
      </div>
    </div>
  );
};
