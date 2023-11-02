import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendMail(payload: {
    recipients: string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: any[];
    ccRecipients?: string[];
  }) {
    const { recipients, subject, text, html, attachments, ccRecipients } =
      payload;

    return true;
  }
}
