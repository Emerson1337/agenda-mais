import { generateHtml } from '@/application/shared/utils/generateHtml';
import * as nodemailer from 'nodemailer';

export class MailSenderAdapter {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail({
    to,
    subject,
    text,
    variables,
    view,
  }: {
    to: string;
    subject: string;
    text: string;
    variables?: {
      [x: string]: unknown;
    };
    view: string;
  }): Promise<void> {
    const htmlContent = generateHtml(`views/${view}.hbs`, {
      to,
      subject,
      text,
      ...variables,
    });

    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to,
        subject,
        text,
        html: htmlContent,
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
