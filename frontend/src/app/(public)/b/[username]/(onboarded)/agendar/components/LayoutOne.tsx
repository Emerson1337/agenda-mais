"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BusinessSchedule, Slot } from "@/shared/types/times-available";
import { notFound, useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";
import { SocialNetwork } from "@/public/b/[username]/(onboarded)/agendar/components/SocialNetwork";
import { Service } from "@/shared/types/business";
import BookAppointment from "@/public/b/[username]/(onboarded)/agendar/components/BookAppointment";
import ChooseService from "@/public/b/[username]/(onboarded)/agendar/components/ChooseService";
import { BookAppointmentData } from "@/shared/types/appointment";
import { bookAppointment } from "@/actions/bookAppointment";
import { toast } from "react-toastify";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { format, parseISO } from "date-fns";
import { numberUtils } from "@/shared/utils/numberUtils";
import { dateUtils } from "@/shared/utils/dateUtils";
import { isAxiosError } from "axios";
import { useGetPublicAssets } from "@/shared/utils/urlUtils";

interface Props {
  datesAvailable: BusinessSchedule;
}

const LayoutOne = ({ datesAvailable }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Slot>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { business, services } = useBusinessContext();
  if (!business) notFound();

  const router = useRouter();

  useEffect(() => {
    const isOnboarded = localStorage.getItem("onboarding");
    if (!isOnboarded) {
      router.replace(`/b/${business.username}`);
    }
    setLoading(false);
  }, [business, router]);

  const handleFinish = useCallback(
    async ({
      clientName,
      phone,
      date,
      notes,
      time,
    }: Omit<BookAppointmentData, "scheduleId" | "serviceId">) => {
      if (!selectedService) {
        toast.error("Serviço não selecionado");
        return undefined;
      }

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
        setIsOpen(false);

        return response.appointment;
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data.error.message ?? "Erro ao agendar horário",
          );
        }
        console.error(error);
        return undefined;
      }
    },
    [selectedService, business, datesAvailable.scheduleId],
  );

  if (loading) {
    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;
  }

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const isAvailable = () => {
    const times = datesAvailable.slots.find(
      (slot) => slot.date === format(new Date(), "yyyy-MM-dd"),
    )?.times;

    return times?.some((time) => {
      const [hour, minute] = time.split(":").map(Number);

      return (
        hour > currentHour || (hour === currentHour && minute > currentMinute)
      );
    });
  };

  const openWhatsapp = ({
    clientName,
    phone,
    date,
    notes,
    time,
  }: Omit<BookAppointmentData, "scheduleId" | "serviceId">) => {
    if (!selectedService) {
      return toast.error("Serviço não selecionado");
    }

    // Delay WhatsApp notification for better UX
    WhatsappService.sendAppointmentConfirmation({
      name: clientName,
      day: format(parseISO(date), "dd/MM/yyyy"),
      time: time,
      phone: phone,
      service: {
        name: selectedService.name,
        price: numberUtils.convertToMonetaryBRL(selectedService.price),
        notes: notes,
        duration: dateUtils.convertToTime(
          selectedService.timeDurationInMinutes,
        ),
      },
    });
  };

  const profileUrl = useGetPublicAssets(business.profilePhoto);

  return (
    <div className="h-full w-full flex flex-wrap justify-evenly">
      <div className="shadow-lg transform duration-200 ease-in-out w-full flex flex-col">
        {/* Header Section with Image */}
        <div className="relative h-32 overflow-hidden">
          <div className="w-full h-full bg-primary opacity-30"></div>
          <div className="absolute inset-x-0 top-16 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>

        {/* Profile Image & Status */}
        <div className="flex flex-col items-center justify-center px-5 -mt-12 relative z-10">
          {business.profilePhoto && (
            <Image
              className="h-32 w-32 bg-primary/70 p-2 rounded-full"
              src={profileUrl}
              alt="Profile Picture"
              width={200}
              height={200}
            />
          )}
          {isAvailable() ? (
            <div className="flex gap-2 mt-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-light text-green-500">
                Atendendo agora
              </span>
            </div>
          ) : (
            <div className="flex gap-2 mt-2">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
              </span>
              <span className="text-xs font-light text-gray-500">
                Indisponível
              </span>
            </div>
          )}
        </div>
        <div className="max-w-96 md:max-w-full self-center">
          {/* Introduction Text */}
          <div className="mt-8 px-4 text-center">
            <p className="text-secondary-foreground text-xs font-thin">
              {business.welcomeMessage}
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full">
            {step === 1 ? (
              <ChooseService
                services={services}
                onSelectService={(service) => {
                  setSelectedService(service);
                  setStep(2);
                }}
              />
            ) : (
              <BookAppointment
                datesAvailable={datesAvailable.slots}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                moveBack={() => setStep(1)}
                open={isOpen}
                setOpen={setIsOpen}
                finish={(data) => {
                  handleFinish(data);
                  openWhatsapp({ ...data });
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <SocialNetwork className="text-foreground h-6" />
      </div>
    </div>
  );
};

export default LayoutOne;
