interface WarnCancelAppointmentProps {
  name: string;
  code: string;
  day: string;
  time: string;
  phone: string;
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
}
