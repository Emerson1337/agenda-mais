import { CalendarIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SchedulesCalendar } from "./SchedulesCalendar";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  DateExceptions,
  ScheduleData,
} from "@/app/(private)/agenda/schemas/schedule.schema";
import { TimesExceptionList } from "./TimesExceptionList";
import { isSameDay } from "date-fns";

export function TimesExceptionSelector() {
  const { setValue, getValues, watch } = useFormContext<ScheduleData>();
  const times = watch("times");

  const [dateExceptions, setDateExceptions] = useState<DateExceptions[]>(
    watch("dateExceptions") ?? []
  );

  useEffect(() => {
    setValue("dateExceptions", dateExceptions);
  }, [dateExceptions, setValue]);

  if (!times?.length) return <></>;

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex justify-center no-underline hover:no-underline">
            <div className="flex items-center gap-1 mr-2">
              <CalendarIcon className="h-3.5 w-3.5" />
              Adicionar exceções
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex justify-center">
            <div className="border-2 max-w-fit">
              <SchedulesCalendar
                defaultValue={dateExceptions}
                times={times}
                onConfirm={(data) => {
                  const exceptions = [
                    ...(getValues().dateExceptions ?? []),
                    {
                      date: data.date,
                      times: times.filter((time) => !data.times.includes(time)),
                    },
                  ];

                  setDateExceptions(exceptions);
                }}
                onDismiss={(data) =>
                  setDateExceptions(
                    dateExceptions.filter(
                      (date) => !isSameDay(date.date, data.date)
                    )
                  )
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <TimesExceptionList dateExceptions={dateExceptions} />
    </>
  );
}
