import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { dateUtils } from "@/shared/utils/dateUtils";
import {
  DateExceptions,
  ScheduleData,
} from "@/app/(private)/agenda/schemas/schedule.schema";
import { useFormContext } from "react-hook-form";

export interface TimesExceptionListProps {
  dateExceptions: DateExceptions[];
}

export function TimesExceptionList({
  dateExceptions,
}: TimesExceptionListProps) {
  const { watch } = useFormContext<ScheduleData>();
  const [times] = watch(["times"]);

  return (
    <>
      <CardHeader>
        <CardTitle>Exceções</CardTitle>
        <CardDescription>
          Estes serão os horarios que <b>não estarão disponíveis</b> para
          agendamento baseado na sua agenda.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-1/4">Dias</TableHead>
              <TableHead className="text-center w-3/4">Horários</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dateUtils.sortByDate(dateExceptions).map((exception, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium text-center">
                  {dateUtils.formatToDDMMYYYY(exception.date)}
                </TableCell>
                <TableCell className="flex justify-center gap-2 flex-wrap">
                  {times.length === exception.times.length ? (
                    <span className="text-muted-foreground text-sm text-center w-full">
                      Todos os horários
                    </span>
                  ) : (
                    exception.times.map((time, key) => (
                      <div
                        key={key}
                        className="border bg-secondary p-2 rounded-sm w-16 text-center"
                      >
                        {time}
                      </div>
                    ))
                  )}
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
  );
}
