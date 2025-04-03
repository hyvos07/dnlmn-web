import { send } from '@emailjs/nodejs';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        return new Response('EmailJS configuration is missing', { status: 500 });
    }

    const { name, email, message } = await request.json();

    try {
        await send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                name: name,
                time: new Date().toISOString().split('T')[0],
                email: email,
                message: message,
            },
            {
                publicKey: EMAILJS_PUBLIC_KEY,
                privateKey: EMAILJS_PRIVATE_KEY,
            }
        );

        return new Response('Email sent successfully', { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response('Failed to send email', { status: 500 });
    }
}