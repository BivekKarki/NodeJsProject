import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SERVER_API_KEY);

async function sendEmail(recepent, {subject, body}) {
  const { data, error } = await resend.emails.send({
    from: 'nodejs-ecommerce@api.com',
    to: [recepent],
    subject,
    html: body,
  });

  if (error) {
    return console.error({ error });
  }
  console.log({ data });
 return data;
};

export default sendEmail;