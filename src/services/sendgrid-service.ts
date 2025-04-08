import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  async sendEmail(email: string, otp: string) {
    const to = email;
    const subject = 'Verification Email';
    const text = 'OTP for verification';
    const html = `<p>Please verify by entering the otp</p> ${otp}`;

    const msg = {
      to,
      from: 'arshnoor@infocusp.com',
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}