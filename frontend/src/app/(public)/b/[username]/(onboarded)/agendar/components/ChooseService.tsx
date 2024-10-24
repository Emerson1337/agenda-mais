import React from "react";
import { Service } from "@/shared/types/business";
import { dateUtils } from "@/shared/utils/dateUtils";

const ChooseService = ({
  services,
  onSelectService,
}: {
  services: Service[];
  onSelectService: (service: Service) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-6">
      <h2 className="text-xl font-bold mb-4">Escolha o serviço</h2>
      <div className="flex gap-4 flex-col">
        {services.map((service, index) => (
          <div
            onClick={() => onSelectService(service)}
            key={index}
            className="flex w-full cursor-pointer transition-all duration-200 hover:bg-primary/40 bg-primary/25 text-foreground flex-col md:px-20 p-4 mx-auto max-w-lg text-center rounded-lg border border-primary dark:border-primary dark:text-white"
          >
            <h3 className="mb-4 text-2xl font-semibold"> {service.name}</h3>
            <p className="font-light text-foreground sm:text-lg">
              {service.description}
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-4xl font-extrabold">
                R$ {service.price}
              </span>
              <span className="text-foreground">
                {dateUtils.convertToTime(service.timeDurationInMinutes)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseService;
