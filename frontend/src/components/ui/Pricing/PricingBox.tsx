import React from "react";
import OfferList from "./OfferList";
import { Price } from "@/shared/types/price";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { Button } from "@/components/ui/button";

const PricingBox = ({ product }: { product: Price }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="rounded-lg space-y-1.5 p-6 border text-card-foreground shadow-sm group relative w-full flex flex-col justify-between lg:h-fit transition-all bg-white hover:shadow-2xl hover:-translate-y-1"
        data-wow-delay=".1s"
      >
        {product.nickname === "Free" && (
          <p className="absolute right-[-50px] top-[55px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-secondary">
            Recomendado
          </p>
        )}
        <span className="mb-5 block text-xl font-medium text-primary dark:text-secondary">
          {product.nickname}
        </span>
        <h2 className="mb-11 text-4xl font-semibold text-primary dark:text-secondary xl:text-[42px] xl:leading-[1.21]">
          <span className="text-xl font-medium">R$ </span>
          <span className="-ml-1 -tracking-[2px]">
            {(product.unit_amount / 100).toLocaleString("pt-BR", {
              currency: "BRL",
            })}
          </span>
          <span className="text-base font-normal text-body-color dark:text-dark-6">
            {" "}
            Por mês
          </span>
        </h2>

        <div className="mb-[50px]">
          <h3 className="mb-5 text-lg font-medium text-primary dark:text-secondary">
            Funcionalidades
          </h3>
          <div className="mb-10 flex flex-col gap-2">
            {product?.offers.map((offer, i) => (
              <OfferList key={i} text={offer} />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-primary bg-[linear-gradient(110deg,#ffffff,45%,#ededee,55%,#ffffff)] bg-[length:200%_100%] px-6 font-medium text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary"
            onClick={() =>
              window.open(WhatsappService.contactAboutPlan(product.nickname))
            }
          >
            Assinar agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
