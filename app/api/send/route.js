import EmailTemplate from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { user,status,reservation,message } = await request.json();
  try {
    const data = await resend.emails.send({
      from: 'VenueEase@sset.co.in',
      to: [reservation.userId.email],
      subject: 'Reservation Update: SCMS School of Engineering & Technology',
      react: EmailTemplate({ status,user,reservation,message}),
    });
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}