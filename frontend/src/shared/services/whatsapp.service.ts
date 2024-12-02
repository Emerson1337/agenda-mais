interface WarnCancelAppointmentProps {
  name: string;
  code: string;
  day: string;
  time: string;
  phone: string;
}

interface BookAppointmentProps {
  name: string;
  code: string;
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
    code,
    day,
    time,
    phone,
  }: WarnCancelAppointmentProps): void {
    const message = `🔔 *Prezado(a) ${name}*,\n\nSeu agendamento com código *${code}* em *${day}* às *${time}* foi cancelado. ❌\n\nPedimos desculpas por qualquer inconveniente causado. 🙏\n\nVocê ainda pode realizar um novo agendamento na plataforma. Aguardamos você lá. 🙂`;
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  }

  static sendAppointmentConfirmation({
    name,
    code,
    day,
    time,
    service,
    phone,
  }: BookAppointmentProps): void {
    const message = `👋 *Olá, sou ${name} e estou realizando um agendamento!*\n\n🔖 *Código do Agendamento*: ${code}\n📅 *Data*: ${day}\n🕒 *Hora*: ${time}\n🔨 *Serviço*: ${
      service.name
    }\n💵 *Valor*: ${service.price} Reais${
      service.notes ? `\n\nAlgumas observações: ${service.notes}` : ""
    }\n\nAguardo ansiosamente pelo atendimento! 😊`;

    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  }
}
