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
import { DateExceptions } from "@/app/(private)/agenda/schemas/schedule.schema";

export interface TimesExceptionListProps {
  dateExceptions: DateExceptions[];
}

export function TimesExceptionList({
  dateExceptions,
}: TimesExceptionListProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Exceções</CardTitle>
        <CardDescription>
          Estes serão os horaríos que <b>não estarão disponíveis</b> para
          agendamento baseado na sua agenda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-1/3">Dias</TableHead>
              <TableHead className="text-center w-2/3">Horários</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dateUtils.sortByDate(dateExceptions).map((exception, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium text-center">
                  {exception.date}
                </TableCell>
                <TableCell className="flex gap-2 flex-wrap">
                  {exception.times.map((time, key) => (
                    <div
                      key={key}
                      className="border bg-secondary p-2 rounded-sm w-16 text-center"
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
  );
}
