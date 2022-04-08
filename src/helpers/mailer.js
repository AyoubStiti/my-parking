/* eslint-disable no-console */
import {setApiKey,send} from '@sendgrid/mail';

require('dotenv').config();

setApiKey(process.env.SENDGRID_API_KEY || '');

const mailer = async (receiverEmail, subject, htmlBody) => {
  await send({
      from: process.env.EMAIL_FROM,
      to: receiverEmail,
      subject,
      html: htmlBody,
    })
    .catch((error) => console.log(error));
};

export default mailer;
