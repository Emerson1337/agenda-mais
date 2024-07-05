import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AppointmentsList() {
  const rows = [
    {
      customer: {
        name: "Liam Johnson",
        phone: "(85) 98616-0507",
      },
      type: "Sale",
      status: "Fulfilled",
      date: "2023-06-23",
      amount: "$250.00",
    },
    {
      customer: {
        name: "Olivia Smith",
        phone: "(85) 98616-0507",
      },
      type: "Refund",
      status: "Declined",
      date: "2023-06-24",
      amount: "$150.00",
    },
  ];

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Atendimentos agendados</CardTitle>
        <CardDescription>
          Estes são todos os agendamentos em aberto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Tipo</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-accent" : ""}
              >
                <TableCell>
                  <div className="font-medium">{row.customer.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {row.customer.phone}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {row.type}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.date}
                </TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
