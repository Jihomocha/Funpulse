import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, guests, tour, message } = await request.json()

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'e1561270@u.nus.edu',
      subject: `New Tour Enquiry from ${name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Tour:</strong> ${tour}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}