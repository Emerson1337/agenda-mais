interface WarnCancelAppointmentProps {
  name: string;
  day: string;
  time: string;
  phone: string;
}

interface BookAppointmentProps {
  name: string;
  day: string;
  time: string;
  phone: string;
  service: {
    name: string;
    price: string;
    notes: string;
    duration: string;
  };
}

export class WhatsappService {
  constructor() {}

  static openChatWith(phone: string): void {
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phone}&text=Olá!`;
    window.open(whatsappLink, "_blank");
  }

  static warnCancelAppointment({
    name,
    day,
    time,
    phone,
  }: WarnCancelAppointmentProps): void {
    const message = `🔔 *Prezado(a) ${name}*,\n\nSeu agendamento em *${day}* às *${time}* foi cancelado. ❌\n\nPedimos desculpas por qualquer inconveniente causado. 🙏\n\nVocê ainda pode realizar um novo agendamento na plataforma. Aguardamos você lá. 🙂`;
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappLink, "_blank");
  }

  static sendAppointmentConfirmation({
    name,
    day,
    time,
    service,
    phone,
  }: BookAppointmentProps): void {
    const message = `👋 *Olá, sou ${name} e estou realizando um agendamento!*\n\n📅 *Data*: ${day}\n🕒 *Hora*: ${time}\n🔨 *Serviço*: ${
      service.name
    }\n💵 *Valor*: ${service.price} Reais${
      service.notes ? `\n\nAlgumas observações: ${service.notes}` : ""
    }\n\nAguardo ansiosamente pelo atendimento! 😊
    \n\n\n❌ Caso deseje cancelar o atendimento, acesse: ${process.env.NEXT_PUBLIC_BASE_URL}/historico e escolha qual atendimento deseja cancelar.`;

    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappLink, "_blank");
  }
}
