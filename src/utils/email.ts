import emailjs from '@emailjs/browser'

export function sendEmail(data: {
  from_name: string
  to_name: string
  code: string | number
  to_email: string
}) {
  const templateParams = {
    ...data
  }

  const serviceKey = process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY ?? ''
  const templateKey = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY ?? ''
  const apiKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY ?? ''

  emailjs.send(serviceKey, templateKey, templateParams, apiKey).catch(() => {
    alert('Algo salió mal, por favor reintenta el registro.')
  })
}
