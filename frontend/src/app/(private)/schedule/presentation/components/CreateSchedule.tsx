"use client";

import { Bounce, toast, ToastContainer } from "react-toastify";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dateUtils } from "@/shared/utils/dateUtils";
import { stringUtils } from "@/shared/utils/stringUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SchedulesCalendar } from "./SchedulesCalendar";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDateExceptions, ITimeRange } from "@/shared/types/schedule";
import { useScheduleMutation } from "@/private/schedule/application/hooks/useScheduleMutation";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function CreateSchedule() {
  const form = useForm();
  const { mutate, isPending, isSuccess, error } = useScheduleMutation();

  const [timeRange, setTimeRange] = useState<ITimeRange>({
    start: "",
    end: "",
  });
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [dateExceptions, setDateExceptions] = useState<IDateExceptions[]>([]);

  const isSubmitEnabled = weekDays?.length && !!times?.length;

  const getTimesInRange = (timeRange?: ITimeRange) => {
    if (!timeRange || !timeRange.start || !timeRange.end) return [];

    const hourStart = stringUtils.getHourNumber(timeRange.start);
    const hourEnd = stringUtils.getHourNumber(timeRange.end);

    return dateUtils.getTimes(hourStart, hourEnd);
  };

  const timesInRangeSelected = useMemo(() => {
    return getTimesInRange(timeRange);
  }, [timeRange]);

  const allTimesPossible = dateUtils.getTimes(
    stringUtils.getHourNumber(timeRange?.start ?? "00:00"),
    23
  );

  useEffect(() => {
    setTimes(timesInRangeSelected);
  }, [timesInRangeSelected]);

  const returnTimesCard = useCallback(() => {
    if (!timesInRangeSelected.length) return <></>;

    return (
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="justify-center max-w-screen-sm"
        defaultValue={timesInRangeSelected}
        onValueChange={(value) => {
          setTimes(value);
        }}
      >
        <div className="flex-row text-center">
          <div className="my-4">
            <p>Esses são os horários que você pré-definiu.</p>
            <p>
              Agora, selecione os horários que deseja disponibilizar para
              agendamento.
            </p>
          </div>
          {timesInRangeSelected.map((time, key) => (
            <ToggleGroupItem className="m-1" key={key} value={time}>
              {time}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
    );
  }, [timesInRangeSelected]);

  useEffect(() => {
    setDateExceptions(dateUtils.sortByDate(dateExceptions));
  }, [dateExceptions]);

  function onSubmit() {
    if (timeRange)
      mutate({ weekDays, exceptions: dateExceptions, timeRange, times });
  }

  useEffect(() => {
    toast.success("Agenda salva com sucesso!");
  }, [isSuccess]);

  useEffect(() => {
    toast.error(error?.message);
  }, [error]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar agendas</CardTitle>
            <CardDescription>
              Para quais dias da semana você deseja deixar a agenda aberta?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap justify-center"
              onValueChange={(value) => {
                setWeekDays(value);
              }}
              defaultValue={weekDays}
            >
              <ToggleGroupItem value="0">Domingo</ToggleGroupItem>
              <ToggleGroupItem value="1">Segunda</ToggleGroupItem>
              <ToggleGroupItem value="2">Terça</ToggleGroupItem>
              <ToggleGroupItem value="3">Quarta</ToggleGroupItem>
              <ToggleGroupItem value="4">Quinta</ToggleGroupItem>
              <ToggleGroupItem value="5">Sexta</ToggleGroupItem>
              <ToggleGroupItem value="6">Sabado</ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
          {!!weekDays?.length && (
            <>
              <CardContent className="flex justify-center gap-4 mt-10">
                <div>Qual será o seu horário de atendimento?</div>
              </CardContent>
              <CardContent className="flex gap-4 justify-center">
                <Select
                  onValueChange={(value) =>
                    setTimeRange({ ...timeRange, start: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="De" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allTimesPossible.map((time, key) => (
                        <SelectItem key={key} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    setTimeRange({ ...timeRange, end: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Até" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allTimesPossible.map((time, key) => (
                        <SelectItem key={key} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardContent className="justify-center flex gap-4">
                {returnTimesCard()}
              </CardContent>
              {!!times?.length && (
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
                            times={times}
                            onConfirm={(data) =>
                              setDateExceptions([
                                ...dateExceptions,
                                {
                                  date: data.date,
                                  times: times.filter(
                                    (time) => !data.times.includes(time)
                                  ),
                                },
                              ])
                            }
                            onDismiss={(data) =>
                              setDateExceptions(
                                dateExceptions.filter(
                                  (date) => date.date !== data.date
                                )
                              )
                            }
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <CardHeader>
                    <CardTitle>Exceções</CardTitle>
                    <CardDescription>
                      Estes serão os horaríos que <b>não estarão disponíveis</b>{" "}
                      para agendamento baseado na sua agenda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center w-1/3">
                            Dias
                          </TableHead>
                          <TableHead className="text-center w-2/3">
                            Horários
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dateExceptions.map((exception, key) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium text-center">
                              {exception.date}
                            </TableCell>
                            <TableCell className="flex gap-2 flex-wrap justify-center max-w-fit">
                              {exception.times.map((time, key) => (
                                <div
                                  key={key}
                                  className="border bg-secondary p-2 rounded-sm"
                                >
                                  {time}
                                </div>
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      *Para desfazer, basta desmarcar o dia no calendário.
                    </div>
                  </CardFooter>
                </>
              )}
            </>
          )}
          <div className="flex justify-center mb-4 items-center">
            <Button
              disabled={!isSubmitEnabled || isPending}
              className="text-white w-28"
              type="submit"
            >
              Salvar
            </Button>
          </div>
          <CardFooter className="flex justify-center h-10">
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
