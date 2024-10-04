"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BusinessSchedule, Slots } from "@/shared/types/times-available";
import { notFound, useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";
import { SocialNetwork } from "@/public/b/[username]/agendar/presentation/components/SocialNetwork";
import React from "react";
import { Service } from "@/shared/types/business";
import BookAppointment from "@/public/b/[username]/agendar/presentation/components/BookAppointment";
import ChooseService from "@/public/b/[username]/agendar/presentation/components/ChooseService";
import { BookAppointmentData } from "@/shared/types/appointment";
import { bookAppointment } from "@/server-actions/bookAppointment";
import { toast } from "react-toastify";
import { parseRequestError } from "@/shared/utils/errorParser";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { format, parseISO } from "date-fns";
import { numberUtils } from "@/shared/utils/numberUtils";
import { dateUtils } from "@/shared/utils/dateUtils";

interface Props {
  datesAvailable: BusinessSchedule;
}

const LayoutOne = ({ datesAvailable }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Slots>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service>();
  const { business, services } = useBusinessContext();

  if (!business) notFound();

  const router = useRouter();
  useEffect(() => {
    const isOnboarded =
      typeof window !== "undefined" && localStorage.getItem("onboarding");

    if (!isOnboarded) {
      router.replace(`/b/${business.username}`);
    }

    setLoading(false);
  }, [business.username, router]);

  if (loading) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  const finish = async ({
    clientName,
    phone,
    date,
    notes,
    time,
  }: Omit<BookAppointmentData, "scheduleId" | "serviceId">) => {
    if (!selectedService) return toast.error("Serviço não selecionado");

    try {
      const response = await bookAppointment(business.username, {
        clientName,
        phone,
        date,
        notes,
        time,
        serviceId: selectedService.id,
        scheduleId: datesAvailable.scheduleId,
      });

      toast.success(response.message);
      setOpen(false);

      setTimeout(() => {
        WhatsappService.sendAppointmentConfirmation({
          name: clientName,
          code: response.appointment.code,
          day: format(parseISO(date), "dd/MM/yyyy"),
          time,
          phone,
          service: {
            name: selectedService.name,
            price: numberUtils.convertToMonetaryBRL(selectedService.price),
            notes: notes,
            duration: dateUtils.convertToMinutes(selectedService.timeDuration),
          },
        });
      }, 3000);
    } catch (error) {
      const parsedError = parseRequestError(error);
      toast.error(parsedError.message);
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap items-center justify-center">
      <div className="shadow-lg transform duration-200 easy-in-out w-full">
        <div className="h-32 overflow-hidden">
          <div className="absolute inset-x-0 top-16 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
          <Image
            className="w-full"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col items-center justify-center px-5 -mt-12 z-50">
          <Image
            className="h-32 w-32 bg-background p-2 rounded-full relative"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            width={200}
            height={200}
          />
          <div className="flex gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-light text-primary">
              Atendendo agora
            </span>
          </div>
        </div>

        <div className="mt-8 px-4">
          <div className="text-center mb-8">
            <p className="text-secondary-foreground text-xs font-thin">
              Serviço de qualidade e os melhores cortes de cabelo que você pode
              encontrar!
            </p>
          </div>
        </div>

        <div className="md:px-8 px-1.5 w-fit mx-auto">
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <ChooseService
              services={services}
              onSelectService={(service) => {
                setSelectedService(service);
                setStep(2); // Move to the next step
              }}
            />
          )}

          {/* Step 2: Book Appointment */}
          {step === 2 && (
            <BookAppointment
              datesAvailable={datesAvailable.slots}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              moveBack={() => setStep(1)}
              open={open}
              setOpen={setOpen}
              finish={finish}
            />
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-12 mb-8">
        <SocialNetwork className="text-foreground h-8" />
      </div>
    </div>
  );
};

export default LayoutOne;
