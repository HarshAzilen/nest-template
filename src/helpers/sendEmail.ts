import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateDynamicHtml } from './dynamicHtmlTemplate';
import { emailParams } from '../utils/types/email-params.type';

export async function sendEmail(email: string, mailParams: emailParams) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const html = await generateDynamicHtml(mailParams.templatePath, mailParams.data);
  try {
    const mailOptions = {
      from: 'sandbox.smtp.mailtrap.io',
      to: email,
      subject: mailParams.subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    Logger.log('Message sent successfully!', info);
    return info;
  } catch (error) {
    Logger.error('Error sending email:', error);
    throw error;
  }
}
