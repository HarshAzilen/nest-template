import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export async function sendEmail(email: string, mailParams: { subject: string; html_content: string }) {

  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '4738b072e02a7d',
      pass: '2b162f96ac5700',
    },
  });

  try {
    const mailOptions = {
      from: 'sandbox.smtp.mailtrap.io',
      to: email,
      subject: mailParams.subject,
      html: mailParams.html_content,
    };
    const info = await transporter.sendMail(mailOptions);
    Logger.log('Message sent successfully!', info);
    return info;
  } catch (error) {
    Logger.error('Error sending email:', error);
    throw error;
  }
}
