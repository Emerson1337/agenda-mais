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
      {services.map((service, index) => (
        <div
          onClick={() => onSelectService(service)}
          key={index}
          className="flex w-full cursor-pointer transition-all duration-200 hover:bg-primary-foreground hover:text-foreground flex-col p-4 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-primary dark:border-primary xl:p-8 dark:text-white"
        >
          <h3 className="mb-4 text-2xl font-semibold">{service.name}</h3>
          <p className="font-light text-gray-500 hover:text-foreground sm:text-lg dark:text-gray-400">
            {service.description}
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-4xl font-extrabold">
              R$ {service.price}
            </span>
            <span className="text-gray-500 on-dark:text-white dark:text-gray-400">
              {dateUtils.convertToMinutes(service.timeDuration)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseService;
