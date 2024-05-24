import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateDynamicHtml } from './dynamicHtmlTemplate';
import { emailParams } from 'src/utils/types/email-params.type';

export async function sendEmail(email: string, mailParams: emailParams) {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '4738b072e02a7d',
      pass: '2b162f96ac5700',
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
