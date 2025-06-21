import { Resend } from 'resend';


async function sendEmail(recepent, {subject, body}) {
  const resend = new Resend(process.env.EMAIL_SERVER_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'nodejs-ecommerce@resend.dev',
    to: [recepent],
    subject,
    html: body,
  });

  if (error) throw error;

  console.log({ data });
 return data;
};

export default sendEmail;