import { useState } from "react";
import HourButton from "./HourButton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CustomMotion from "@/components/ui/custom-motion";
import { SocialNetwork } from "./SocialNetwork";

const LayoutOne = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="h-screen w-full flex flex-wrap items-center justify-center">
      <div className="w-full h-screen bg-gray-950 shadow-lg transform duration-200 easy-in-out">
        <div className="h-32 overflow-hidden">
          <div className="absolute inset-x-0 top-16 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center px-5 -mt-12 z-50">
          <img
            className="h-32 w-32 bg-black p-2 rounded-full relative"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
          <div className="flex gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold text-xs text-green-500">
              Atendendo agora
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-14 w-full mt-8">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <p className="text-gray-300 text-xs font-thin">
                Serviço de qualidade e os melhores cortes de cabelo que você
                pode encontrar!
              </p>
            </div>
            {/* <CustomDatePicker setSelectedDate={setSelectedDate} /> */}
            {selectedDate && (
              <CustomMotion>
                <div className="mt-8 w-full">
                  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-base mb-8 text-center">
                      <span className="font-semibold">Selecione</span> um
                      horário para:
                      <p>
                        <span className="font-semibold">
                          {format(selectedDate, "dd/MM/yyyy")}
                        </span>
                      </p>
                    </h3>
                    <div className="gap-1 flex w-fit flex-wrap justify-start">
                      <HourButton>18:00</HourButton>
                      <HourButton>18:00</HourButton>
                      <HourButton>18:00</HourButton>
                      <HourButton>18:00</HourButton>
                    </div>
                  </div>
                </div>
              </CustomMotion>
            )}
          </div>
        </div>
        {/* 
        <Modal
          title="Confirmation"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Confirm your selection?</p>
        </Modal> */}

        <div className="w-full flex items-center justify-center mt-8">
          <Button
            className="bg-white text-black font-semibold h-14"
            onClick={showModal}
          >
            CONFIRMAR
          </Button>
        </div>
        <div className="w-full flex items-center justify-center mt-8 absolute bottom-10">
          <SocialNetwork className="text-white h-8" />
        </div>
      </div>
    </div>
  );
};

export default LayoutOne;
